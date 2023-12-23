import { User } from '@/database/types/user';
import Notification, { EmailConfig } from '@/notification/notifications/notification';

interface OneTimePasswordNotificationData {
  user: User
  token: string
}

export default class OneTimePasswordNotification extends Notification<OneTimePasswordNotificationData> {
  protected emailConfig: EmailConfig = {
    subject: 'Your One Time Password',
    template: 'one-time-password',
  };
}