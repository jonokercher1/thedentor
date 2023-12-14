import { Inject, Injectable } from '@nestjs/common';
import { User } from '@/database/types/user';
import { OneTimePasswordRepository } from '@/auth/repositories/one-time-password.repository';
import { NotificationService } from '@/notification/notification.service';
import { EmailNotificaitonProvider, IEmailNotificationProvider } from '@/notification/channels/email/types/email-provider';
import OneTimePasswordNotification from '@/notification/notifications/one-time-password.notification';

@Injectable()
export class OneTimePasswordService {
  constructor(
    private readonly oneTimePasswordRepository: OneTimePasswordRepository,
    private readonly notificationService: NotificationService,
    @Inject(IEmailNotificationProvider)
    private readonly emailProvider?: EmailNotificaitonProvider,
  ) { }

  public async canUserRequestOneTimePassword(user: User): Promise<boolean> {
    const oneMinuteInMilliseconds = 60 * 1000; // 1 minute
    const oneTimePasswordsFromLastMinute = await this.oneTimePasswordRepository.findMany({
      userId: user.id,
      createdAt: {
        gt: new Date(new Date().getTime() - oneMinuteInMilliseconds),
      },
    });

    return !oneTimePasswordsFromLastMinute;
  }

  public async expireAllUsersOneTimePasswords(user: User): Promise<boolean> {
    return this.oneTimePasswordRepository.markAllUsersActivePasswordsExpired(user.id);
  }

  public async requestNewOneTimePasswordForUser(user: User): Promise<any> {
    await this.expireAllUsersOneTimePasswords(user);

    const oneTimePassword = await this.oneTimePasswordRepository.create(user.id);

    this.notificationService.notifyUser(
      user,
      new OneTimePasswordNotification(
        {
          user,
          token: oneTimePassword.token,
        },
        this.emailProvider,
      ),
    );

    return oneTimePassword;
  }

  public async verifyEmailAndOneTimePasswordCombination(email: string, oneTimePassword: string) {
    const validOneTimePassword = await this.oneTimePasswordRepository.findFirst({
      where: {
        user: {
          email,
        },
        token: oneTimePassword,
        expiresAt: {
          gt: new Date(),
        },
      },
    });

    return !!validOneTimePassword;
  }
}