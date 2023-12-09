import { User } from '@/database/types/user';

export interface ProductData {
  id: string
  price: number
  name: string
}

export interface PaymentProvider {
  createPaymentIntent: (customer: User, product: ProductData) => Promise<string>
  handlePaymentWebhook: (body: any, headers: any) => Promise<void>
}

export const IPaymentProvider = Symbol('IPaymentProvider');