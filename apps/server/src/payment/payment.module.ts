import { Module } from '@nestjs/common';
import { PaymentService } from './payment.service';
import { IPaymentProvider } from './types/payment-provider';
import { StripeProvider } from './providers/stripe-provider';
import { SubscriptionService } from './subscription.service';
import { DatabaseModule } from '../database/database.module';
import { UserModule } from '../user/user.module';
import { SubscriptionTierRepository } from './repositories/subscription-tier.repository';

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
  ],
  imports: [DatabaseModule, UserModule],
})
export class PaymentModule { }
