import { Inject, Injectable } from '@nestjs/common';
import { PasswordResetRepository } from '@/user/repositories/password-reset.repository';
import { NotificationService } from '@/notification/notification.service';
import PasswordResetRequest from '@/notification/notifications/PasswordResetRequest';
import { UserService } from './user.service';
import { EmailNotificaitonProvider, IEmailNotificationProvider } from '@/notification/channels/email/types/email-provider';

@Injectable()
export class UserPasswordResetService {
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

  private generateResetToken() {
    const randomValue = () => {
      return Math.random().toString(36).substring(2);
    };

    return `${randomValue}${randomValue}${randomValue}`;
  }
}