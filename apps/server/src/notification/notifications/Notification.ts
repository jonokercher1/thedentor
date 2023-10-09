import { promises as fs } from 'fs';
import { compile } from 'handlebars';
import * as mjml2html from 'mjml';
import { Inject } from '@nestjs/common';
import { EmailNotificaitonProvider, IEmailNotificationProvider } from '@/notification/channels/email/types/email-provider';

export default abstract class Notification<Data> {
  public emailConfig: {
    template: string,
    subject: string
  };

  constructor(
    public readonly data: Data,
    @Inject(IEmailNotificationProvider)
    private readonly emailProvider?: EmailNotificaitonProvider,
  ) { }

  // TODO: we might need to introduce a queue here to make this non-blocking
  // TODO: replace this with react email
  public async viaEmail(emailAddress: string): Promise<boolean> {
    const templateContents = await fs.readFile(
      `${__dirname}/../channels/email/templates/${this.emailConfig.template}`,
      'utf8',
    );
    const compiledTemplate = compile(templateContents);
    const mjml = compiledTemplate(this.data);
    const { html } = mjml2html(mjml);

    return this.emailProvider.sendEmail(emailAddress, this.emailConfig.subject, html);
  }
}