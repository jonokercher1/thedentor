import { Module, forwardRef } from '@nestjs/common';
import { IPaymentProvider } from '@/payment/types/payment-provider';
import { StripeProvider } from '@/payment/providers/stripe-provider';
import { DatabaseModule } from '@/database/database.module';
import { UserModule } from '@/user/user.module';
import { PaymentWebhookController } from '@/payment/controllers/payment-webhook.controller';
import { CourseModule } from '@/course/course.module';

@Module({
  controllers: [PaymentWebhookController],
  providers: [
    {
      provide: IPaymentProvider,
      useClass: StripeProvider,
    },
  ],
  exports: [
    IPaymentProvider,
  ],
  imports: [
    DatabaseModule,
    UserModule,
    forwardRef(() => CourseModule),
  ],
})
export class PaymentModule { }
