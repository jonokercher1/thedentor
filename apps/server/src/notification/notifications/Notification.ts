import { Inject } from '@nestjs/common';
import { EmailNotificaitonProvider } from '@/notification/channels/email/types/email-provider';
import { IEmailNotificationProvider } from '@/notification/channels/email/email-notification.provider';

export interface EmailConfig {
  emailContents: string
  subject: string
}

export interface INotification {
  viaEmail(emailAddress: string): Promise<boolean>
  emailConfig: EmailConfig
}

export default abstract class Notification<Data> implements INotification {
  public abstract readonly emailConfig: EmailConfig;

  constructor(
    public readonly data: Data,
    @Inject(IEmailNotificationProvider)
    private readonly emailProvider?: EmailNotificaitonProvider,
  ) { }

  // TODO: we might need to introduce a queue here to make this non-blocking
  // TODO: replace this with react email
  public async viaEmail(emailAddress: string): Promise<boolean> {
    // const templateContents = await fs.readFile(
    //   `notification/channels/email/templates/${this.emailConfig.template}.mjml`,
    //   'utf8',
    // );
    // const compiledTemplate = compile(templateContents);
    // const mjml = compiledTemplate(this.data);
    // const { html } = mjml2html(mjml);
    // TODO: compile a react email template, passing data in as props. Compile to HTML and pass in as content

    return this.emailProvider.sendEmail(emailAddress, this.emailConfig.subject, this.emailConfig.emailContents);
  }
}