import { Injectable } from '@nestjs/common';
import Notification from '@/notification/notifications/notification';
import { NotificationUser } from '@/notification/types/notification-user';

@Injectable()
export class NotificationService {
  public async notifyUser<Data>(user: NotificationUser, notification: Notification<Data>) {
    // TODO: setup user notification preferences
    await notification.viaEmail(user.email);
  }
}
