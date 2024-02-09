import { EmailNotificaitonProvider } from '../types/email-provider';
import { Transporter, createTransport } from 'nodemailer';

export default class NodemailerEmailProvider implements EmailNotificaitonProvider {
  private readonly client: Transporter;

  constructor() {
    this.client = createTransport({
      host: process.env.NODEMAILER_HOST ?? 'smtp.mailtrap.io',
      port: Number(process.env.NODEMAILER_PORT) ?? 2525,
      auth: {
        user: process.env.NODEMAILER_USER,
        pass: process.env.NODEMAILER_PASS,
      },
    });
  }

  public async sendEmail(email: string, subject: string, content: string): Promise<boolean> {
    const info = await this.client.sendMail({
      from: `'"${process.env.EMAIL_FROM_NAME}" <${process.env.EMAIL_FROM_ADDRESS}>'`,
      to: email,
      subject,
      html: content,
    });

    return !!info.messageId;
  }
}