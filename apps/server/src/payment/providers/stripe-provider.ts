import Stripe from 'stripe';
import { PaymentProvider } from '@/payment/types/payment-provider';
import { SubscriptionTier, User } from '@prisma/client';

export class StripeProvider implements PaymentProvider {
  public readonly client: Stripe;

  constructor() {
    this.client = new Stripe(process.env.STRIPE_SECRET, { apiVersion: '2023-10-16' });
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

  public async createCheckoutUrl(priceInLowestDenomination: number, currency = 'gbp'): Promise<string> {
    const session = await this.client.checkout.sessions.create({
      // ui_mode: 'embedded',
      payment_method_types: ['card', 'klarna'],
      line_items: [
        {
          price_data: {
            currency,
            unit_amount: priceInLowestDenomination,
          },
          quantity: 1,
        },
      ],
      success_url: '',
      redirect_on_completion: 'if_required',
      return_url: '',
      mode: 'payment',
    });

    return session.client_secret;
  }
}