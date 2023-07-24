import { SubscriptionTier, User } from '@prisma/client';

export interface PaymentProvider {
  createCustomer: (email: string) => Promise<any>
  createSubscription: (customer: User, subscriptionTier: SubscriptionTier) => Promise<any>
}

export const IPaymentProvider = Symbol('IPaymentProvider');