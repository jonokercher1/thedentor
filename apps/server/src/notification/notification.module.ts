import { Module } from '@nestjs/common';
import { NotificationService } from '@/notification/notification.service';
import { IEmailNotificationProvider } from '@/notification/channels/email/types/email-provider';
import ConsoleEmailProvider from '@/notification/channels/email/providers/ConsoleEmailProvider';

@Module({
  providers: [
    NotificationService,
    {
      provide: IEmailNotificationProvider,
      useClass: ConsoleEmailProvider, // // TODO: use a factory with env values
    },
  ],
  exports: [IEmailNotificationProvider],
})
export class NotificationModule { }
