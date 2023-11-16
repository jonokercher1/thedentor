import { SubscriptionTier, User } from '@prisma/client';
import { PaymentProvider } from '../../src/payment/types/payment-provider';
import { faker } from '@faker-js/faker/locale/en_GB';

export class TestPaymentProvider implements PaymentProvider {
  public async createCustomer(email: string, idOverride?: string): Promise<{ id: string, email: string }> {
    return {
      id: idOverride ?? 'payment-provider-customer-id',
      email,
    };
  }

  public async createSubscription(customer: User, subscriptionTier: SubscriptionTier, idOverride?: string): Promise<{ id: string }> {
    return {
      id: idOverride ?? 'payment-provider-subscription-id',
    };
  }

  public async createCheckoutUrl(priceInLowestDenomination: number, currency = 'gbp'): Promise<string> {
    return faker.string.sample({ min: 10, max: 20 });
  }
}