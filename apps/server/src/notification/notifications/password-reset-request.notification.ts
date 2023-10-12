import Notification, { EmailConfig } from '@/notification/notifications/notification';
import { User } from '@prisma/client';

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