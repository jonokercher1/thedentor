import { Inject, Injectable } from '@nestjs/common';
import { PasswordResetRepository } from '@/user/repositories/password-reset.repository';
import { NotificationService } from '@/notification/notification.service';
import PasswordResetRequest from '@/notification/notifications/password-reset-request.notification';
import { UserService } from './user.service';
import { EmailNotificaitonProvider, IEmailNotificationProvider } from '@/notification/channels/email/types/email-provider';
import * as dayjs from 'dayjs';

@Injectable()
export class UserPasswordResetService {
  private readonly MAX_TOKEN_VALIDITY_MILLISECONDS = 1000 * 60 * 60 * 24;

  constructor(
    private readonly userService: UserService,
    private readonly passwordResetRepository: PasswordResetRepository,
    private readonly notificationService: NotificationService,
    @Inject(IEmailNotificationProvider)
    private readonly emailProvider?: EmailNotificaitonProvider,
  ) { }

  public async requestPasswordReset(email: string) {
    const token = this.generateResetToken();
    await this.passwordResetRepository.create({
      token,
      user: {
        connect: {
          email,
        },
      },
    });

    const user = await this.userService.getUserByEmail(email);
    this.notificationService.notifyUser(
      user,
      new PasswordResetRequest({
        user,
        token,
      }, this.emailProvider),
    );
  }

  public async getPasswordResetRequestByToken(token: string) {
    const passwordResetRequest = await this.passwordResetRepository.findByToken(
      token,
      {
        ...this.passwordResetRepository.DEFAULT_FIELDS,
        user: {
          select: {
            email: true,
          },
        },
      },
    );

    const isValid = await this.isResetRequestValid(passwordResetRequest.createdAt);

    if (!isValid) {
      // TODO: we should have some internal errors being thrown with better metadata and logging attached
      throw new Error(`Passsword reset request invalid. Token: ${token}`);
    }

    return passwordResetRequest;
  }

  private isResetRequestValid(createdAt?: Date): boolean {
    const isValidAge = dayjs(createdAt).add(this.MAX_TOKEN_VALIDITY_MILLISECONDS, 'milliseconds').isAfter(dayjs());

    return isValidAge;
  }

  private generateResetToken() {
    const randomValue = () => {
      return Math.random().toString(36).substring(2);
    };

    return `${randomValue}${randomValue}${randomValue}`;
  }
}