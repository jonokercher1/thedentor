import { Inject, Injectable } from '@nestjs/common';
import { IPaymentProvider, PaymentProvider } from './types/payment-provider';

@Injectable()
export class PaymentService {
  constructor(
    @Inject(IPaymentProvider)
    private readonly paymentProvider: PaymentProvider,
  ) { }
}
