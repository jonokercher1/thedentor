import { SubscriptionTier, User } from '@prisma/client';
import { PaymentProvider } from '../../src/payment/types/payment-provider';

export class TestPaymentProvider implements PaymentProvider {
  public async createCustomer(email: string, idOverride?: string): Promise<any> {
    return {
      id: idOverride ?? 'payment-provider-customer-id',
      email,
    };
  }

  public async createSubscription(customer: User, subscriptionTier: SubscriptionTier, idOverride?: string): Promise<any> {
    return {
      id: idOverride ?? 'payment-provider-subscription-id',
    };
  }
}