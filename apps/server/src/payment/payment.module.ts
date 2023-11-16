import { Module } from '@nestjs/common';
import { PaymentService } from '@/payment/payment.service';
import { IPaymentProvider } from '@/payment/types/payment-provider';
import { StripeProvider } from '@/payment/providers/stripe-provider';
import { SubscriptionService } from '@/payment/subscription.service';
import { DatabaseModule } from '@/database/database.module';
import { UserModule } from '@/user/user.module';
import { SubscriptionTierRepository } from '@/payment/repositories/subscription-tier.repository';

@Module({
  providers: [
    SubscriptionTierRepository,
    PaymentService,
    SubscriptionService,
    {
      provide: IPaymentProvider,
      useClass: StripeProvider,
    },
  ],
  exports: [
    PaymentService,
    SubscriptionService,
    IPaymentProvider,
  ],
  imports: [DatabaseModule, UserModule],
})
export class PaymentModule { }
