import { User } from '@prisma/client';
import { PaymentProvider, ProductData } from '../../src/payment/types/payment-provider';
import { faker } from '@faker-js/faker/locale/en_GB';

export class TestPaymentProvider implements PaymentProvider {
  public async handlePaymentWebhook(body: any, headers: any) {
    return;
  }

  public async createPaymentIntent(customer: User, product: ProductData) {
    return faker.string.sample(10);
  }
}