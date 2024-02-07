import { User } from '@/database/types/user';
import { Inject } from '@nestjs/common';
import { EmailNotificaitonProvider, IEmailNotificationProvider } from '../channels/email/types/email-provider';

interface OneTimePasswordNotificationData {
  user: User
  token: string
}

export default class OneTimePasswordNotification {
  protected emailConfig = {
    subject: 'Your One Time Password',
    template: 'one-time-password',
  };

  constructor(
    public readonly data: OneTimePasswordNotificationData,
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

    return this.emailProvider.sendEmail(emailAddress, this.emailConfig.subject, '');
  }
}