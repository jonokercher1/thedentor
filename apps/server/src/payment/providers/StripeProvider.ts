import Stripe from 'stripe';
import { PaymentProvider } from '../types/PaymentProvider';
import { SubscriptionTier, User } from '@prisma/client';

export class StripeProvider implements PaymentProvider {
  public readonly client: Stripe;

  constructor() {
    this.client = new Stripe(process.env.STRIPE_SECRET, { apiVersion: '2022-11-15' });
  }

  public async createCustomer(email: string): Promise<Stripe.Customer> {
    return this.client.customers.create({ email });
  }

  public async createSubscription(customer: User, subscriptionTier: SubscriptionTier): Promise<Stripe.Subscription> {
    return this.client.subscriptions.create({
      customer: customer.paymentProviderCustomerId,
      items: [
        {
          price: subscriptionTier.priceId,
        },
      ],
      trial_period_days: 14, // TODO: move to config object
      payment_settings: {
        save_default_payment_method: 'on_subscription',
      },
      trial_settings: {
        end_behavior: {
          missing_payment_method: 'cancel',
        },
      },
    });
  }
}