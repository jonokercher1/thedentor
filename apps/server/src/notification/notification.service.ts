import { Injectable } from '@nestjs/common';
import { NotificationUser } from '@/notification/types/notification-user';

@Injectable()
export class NotificationService {
  public async notifyUser(user: NotificationUser, notification: any) {
    // TODO: setup user notification preferences
    await notification.viaEmail(user.email);
  }
}
