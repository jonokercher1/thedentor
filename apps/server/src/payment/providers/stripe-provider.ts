import Stripe from 'stripe';
import { PaymentProvider, ProductData } from '@/payment/types/payment-provider';
import { User } from '@prisma/client';
import { stripeConfig } from '../config/stripe.config';
import MissingPropertyError from '@/common/errors/missing-property-error';
import { UserService } from '@/user/services/user.service';
import { CourseService } from '@/course/services/course.service';
import { UserCourseService } from '@/user/services/user-course.service';
import { Injectable } from '@nestjs/common';

@Injectable()
export class StripeProvider implements PaymentProvider {
  public readonly client: Stripe;

  private readonly webhookEvents = [
    'payment_intent.succeeded',
  ];

  constructor(
    private readonly userService: UserService,
    private readonly courseService: CourseService,
    private readonly userCourseService: UserCourseService,
  ) {
    this.client = new Stripe(stripeConfig.secretKey, { apiVersion: '2023-10-16' });
  }

  public async createPaymentIntent(customer: User, product: ProductData): Promise<string> {
    const paymentIntent = await this.client.paymentIntents.create({
      amount: product.price,
      currency: 'gbp',
      payment_method_types: stripeConfig.paymentMethodTypes as Stripe.Checkout.SessionCreateParams.PaymentMethodType[],
      ...(customer.paymentProviderCustomerId ? { custmer: customer.paymentProviderCustomerId } : {}),
      metadata: {
        email: customer.email,
        course: product.id,
      },
    });

    return paymentIntent.client_secret;
  }

  public async handlePaymentWebhook(body: any, headers: any): Promise<void> {
    // TODO: do we care about re-processing the same event? If a user already owns the course then they already paid
    const signature = this.getWebhookSignatureFromHeaders(headers);
    const event = this.client.webhooks.constructEvent(
      body,
      signature,
      stripeConfig.webhookSecret,
    );

    // TODO: we should refactor this so this function is doing less
    if (this.webhookEvents.includes(event.type)) {
      const { metadata } = event.data.object as any;

      const missingMetadataProperties = [];

      if (!metadata.course) missingMetadataProperties.push('course');
      if (!metadata.email) missingMetadataProperties.push('email');

      if (missingMetadataProperties.length) {
        throw new MissingPropertyError('Stripe Webhook', missingMetadataProperties);
      }

      const user = await this.userService.getUserByEmail(metadata.email);
      const isCourseAlreadyOwned = await this.userCourseService.isCourseOwnedByUser(metadata.course, user.id);

      if (!isCourseAlreadyOwned) {
        await this.userCourseService.attachCourseToUser(metadata.course, user.id);
      }
    }
  }

  private getWebhookSignatureFromHeaders(headers: any): string | null {
    return headers['stripe-signature'] ?? null;
  }
}