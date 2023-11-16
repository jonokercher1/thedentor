import { SubscriptionTier } from '@/database/types/subscription-tier';
import { User } from '@/database/types/user';

export interface PaymentProvider {
  createCustomer: (email: string) => Promise<any>
  createSubscription: (customer: User, subscriptionTier: SubscriptionTier) => Promise<any>
  createCheckoutUrl: (priceInLowestDenomination: number, currency?: string) => Promise<string>
}

export const IPaymentProvider = Symbol('IPaymentProvider');