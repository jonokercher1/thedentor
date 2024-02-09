import { User } from '@/database/types/user';
import Notification from '@/notification/notifications/Notification';
import { OneTimePasswordEmail } from 'emails';
import { render } from '@react-email/components';

export interface OneTimePasswordNotificationData {
  user: User
  token: string
}

export default class OneTimePasswordNotification extends Notification<OneTimePasswordNotificationData> {
  public emailConfig = {
    subject: 'Your One Time Password',
    emailContents: render(OneTimePasswordEmail(this.data)),
  };
}