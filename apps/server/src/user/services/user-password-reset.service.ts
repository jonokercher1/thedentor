import { Inject, Injectable } from '@nestjs/common';
import { PasswordResetRepository } from '@/user/repositories/password-reset.repository';
import { NotificationService } from '@/notification/notification.service';
import PasswordResetRequest from '@/notification/notifications/password-reset-request.notification';
import { UserService } from './user.service';
import { EmailNotificaitonProvider, IEmailNotificationProvider } from '@/notification/channels/email/types/email-provider';
import * as dayjs from 'dayjs';
import InvalidPasswordResetRequest from '@/common/errors/auth/invalid-password-reset-request';
import { PasswordResetTokenFields } from '@/database/types/password-reset-token';

@Injectable()
export class UserPasswordResetService {
  private readonly TOKEN_WITH_USER_FIELDS: PasswordResetTokenFields = {
    ...this.passwordResetRepository.DEFAULT_FIELDS,
    user: {
      select: {
        email: true,
      },
    },
  };

  constructor(
    private readonly userService: UserService,
    private readonly passwordResetRepository: PasswordResetRepository,
    private readonly notificationService: NotificationService,
    @Inject(IEmailNotificationProvider)
    private readonly emailProvider?: EmailNotificaitonProvider,
  ) { }

  public async requestPasswordReset(email: string) {
    const token = this.generateResetToken();
    const user = await this.userService.getUserByEmail(email);

    await this.invalidateAllExistingTokens(user.id);

    const request = await this.passwordResetRepository.create({
      token,
      user: {
        connect: {
          email,
        },
      },
    }, this.TOKEN_WITH_USER_FIELDS);

    this.notificationService.notifyUser(
      user,
      new PasswordResetRequest(
        {
          user,
          token,
        },
        this.emailProvider,
      ),
    );

    return request;
  }

  public async getPasswordResetRequestByToken(token: string) {
    const passwordResetRequest = await this.passwordResetRepository.findByToken(token, this.TOKEN_WITH_USER_FIELDS);

    const isValid = await this.isResetRequestValid(passwordResetRequest.expiresAt);

    if (!isValid) {
      throw new InvalidPasswordResetRequest(`Token: ${token}`);
    }

    return passwordResetRequest;
  }

  public async invalidateAllExistingTokens(userId: string) {
    return this.passwordResetRepository.updateMany(
      'userId',
      userId,
      {
        expiresAt: dayjs().subtract(1, 'minute').toDate(),
      },
    );
  }

  public async deleteResetToken(id: string) {
    return this.passwordResetRepository.delete(id);
  }

  private isResetRequestValid(expiresAt?: Date): boolean {
    const isValidAge = dayjs(expiresAt).isAfter(dayjs());

    return isValidAge;
  }

  private generateResetToken() {
    const randomValue = () => {
      return Math.random().toString(36).substring(2);
    };

    return `${randomValue()}${randomValue()}${randomValue()}`;
  }
}