import { Module, forwardRef } from '@nestjs/common';
import { NotificationService } from '@/notification/notification.service';
import { UserModule } from '@/user/user.module';
import { EmailNotificationProvider, IEmailNotificationProvider } from '@/notification/channels/email/email-notification.provider';

@Module({
  providers: [
    NotificationService,
    EmailNotificationProvider,
  ],
  exports: [IEmailNotificationProvider],
  imports: [
    forwardRef(() => UserModule),
  ],
})
export class NotificationModule { }
