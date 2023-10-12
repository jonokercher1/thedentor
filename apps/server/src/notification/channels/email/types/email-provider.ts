export interface EmailNotificaitonProvider {
  sendEmail: (email: string, subject: string, content: string) => Promise<boolean>;
}

export const IEmailNotificationProvider = Symbol('IEmailNotificationProvider');