import { EmailNotificaitonProvider } from '../types/email-provider';

export default class ConsoleEmailProvider implements EmailNotificaitonProvider {
  public async sendEmail(email: string, subject: string, content: string): Promise<boolean> {
    console.log(`
      |-----------------------------|
      | Email Sending to: ${email}  |
      |-----------------------------|
      | Subject: ${subject}         |
      | Content: ${content}         |
      |-----------------------------|
    `);

    return true;
  }
}