import { User } from '@/database/types/user';
import Notification, { EmailConfig } from '@/notification/notifications/notification';

interface PasswordResetRequestData {
  user: User
  token: string
}

export default class PasswordResetRequest extends Notification<PasswordResetRequestData> {
  protected emailConfig: EmailConfig = {
    subject: 'Reset Your Password',
    template: 'password-reset',
  };
}