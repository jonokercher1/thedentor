import { User } from '@prisma/client';
import { PaymentProvider, ProductData } from '../../src/payment/types/payment-provider';
import { faker } from '@faker-js/faker/locale/en_GB';

export class TestPaymentProvider implements PaymentProvider {
  createPaymentIntent: (customer: User, product: ProductData) => Promise<string>;
}