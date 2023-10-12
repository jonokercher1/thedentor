import * as fs from 'fs/promises';
import * as mjml2html from 'mjml';
import { Inject } from '@nestjs/common';
import { EmailNotificaitonProvider, IEmailNotificationProvider } from '@/notification/channels/email/types/email-provider';
import { compile } from 'handlebars';

export interface EmailConfig {
  template: string
  subject: string
}

export default abstract class Notification<Data> {
  protected abstract readonly emailConfig: EmailConfig;

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

    return this.emailProvider.sendEmail(emailAddress, this.emailConfig.subject, '');
  }
}