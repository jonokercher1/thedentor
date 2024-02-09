import { Inject, Injectable } from '@nestjs/common';
import { User } from '@/database/types/user';
import { OneTimePasswordRepository } from '@/auth/repositories/one-time-password.repository';
import { NotificationService } from '@/notification/notification.service';
import OneTimePasswordNotification from '@/notification/notifications/one-time-password/one-time-password.notification';
import * as dayjs from 'dayjs';
import { IEmailNotificationProvider } from '@/notification/channels/email/email-notification.provider';
import { EmailNotificaitonProvider } from '@/notification/channels/email/types/email-provider';

@Injectable()
export class OneTimePasswordService {
  constructor(
    private readonly oneTimePasswordRepository: OneTimePasswordRepository,
    private readonly notificationService: NotificationService,
    @Inject(IEmailNotificationProvider)
    private readonly emailProvider?: EmailNotificaitonProvider,
  ) { }

  public async canUserRequestOneTimePassword(user: User): Promise<boolean> {
    let canRequestOneTimePassword = true;

    try {
      const oneTimePasswordsFromLastMinute = await this.oneTimePasswordRepository.findFirst({
        userId: user.id,
        createdAt: {
          gt: dayjs().subtract(1, 'minute').toDate(),
        },
      });

      canRequestOneTimePassword = !oneTimePasswordsFromLastMinute;
    } catch { } // fail silently

    return canRequestOneTimePassword;
  }

  public async expireAllUsersOneTimePasswords(user: User): Promise<boolean> {
    return this.oneTimePasswordRepository.markAllUsersActivePasswordsExpired(user.id);
  }

  public async requestNewOneTimePasswordForUser(user: User): Promise<any> {
    await this.expireAllUsersOneTimePasswords(user);

    const oneTimePassword = await this.oneTimePasswordRepository.createWithRandomToken(user.id);
    const oneTimePasswordNotification = new OneTimePasswordNotification(
      {
        user,
        token: oneTimePassword.token,
      },
      this.emailProvider,
    );

    this.notificationService.notifyUser(user, oneTimePasswordNotification);

    return oneTimePassword;
  }

  public async verifyEmailAndOneTimePasswordCombination(email: string, oneTimePassword: string) {
    const validOneTimePassword = await this.oneTimePasswordRepository.findFirst({
      user: {
        email,
      },
      token: oneTimePassword,
      expiresAt: {
        gt: new Date(),
      },
    });

    return !!validOneTimePassword;
  }
}