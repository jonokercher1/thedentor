import Notification from '@/notification/notifications/Notification';
import { User } from '@prisma/client';

interface PasswordResetRequestData {
  user: User
  token: string
}

export default class PasswordResetRequest extends Notification<PasswordResetRequestData> {
  public emailConfig = {
    template: 'password-reset.mjml',
    subject: 'Reset Your Password',
  };
}