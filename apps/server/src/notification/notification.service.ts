import { Injectable } from '@nestjs/common';
import { NotificationUser } from '@/notification/types/notification-user';
import { INotification } from '@/notification/notifications/Notification';
import { UserNotificationPreferenceService } from '@/user/services/user-notification-preference.service';

@Injectable()
export class NotificationService {
  constructor(
    private readonly userNotificationPreferenceService: UserNotificationPreferenceService,
  ) { }

  public async notifyUser(user: NotificationUser, notification: INotification) {
    const userNotificationPreferences = await this.userNotificationPreferenceService.getUserNotificationPreferences(user.id);

    if (userNotificationPreferences.email) {
      await notification.viaEmail(user.email);
    }
  }
}
