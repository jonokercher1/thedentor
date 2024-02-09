import ConsoleEmailProvider from '@/notification/channels/email/providers/console-email.provider';
import { EmailNotificaitonProvider } from './types/email-provider';
import NodemailerEmailProvider from './providers/nodemailer-email.provider';

const getEmailNotificationProvider = (): EmailNotificaitonProvider => {
  const logger = process.env.EMAIL_PROVIDER ?? 'console';

  switch (logger) {
    case 'mailgun':
      return new NodemailerEmailProvider;

    case 'console':
    default:
      return new ConsoleEmailProvider;
  }
};

export const IEmailNotificationProvider = Symbol('IEmailNotificationProvider');

export const EmailNotificationProvider = {
  provide: IEmailNotificationProvider,
  useValue: getEmailNotificationProvider(),
};