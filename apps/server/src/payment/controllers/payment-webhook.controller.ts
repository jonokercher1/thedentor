import { Public } from '@/auth/guards/public.guard';
import HttpSuccessResponse from '@/common/responses/http-success.response';
import { BadRequestException, Controller, Headers, Inject, Post, RawBodyRequest, Req } from '@nestjs/common';
import { IPaymentProvider, PaymentProvider } from '@/payment/types/payment-provider';
import { ILoggingProvider } from '@/logging/logging.provider';
import { ILogger } from '@/logging/types/Logger';

@Controller('payments/webook')
export class PaymentWebhookController {
  constructor(
    @Inject(ILoggingProvider)
    private readonly logger: ILogger,
    @Inject(IPaymentProvider)
    private readonly paymentProvider: PaymentProvider,
  ) { }

  @Public()
  @Post('/')
  public async handlePaymentWebook(@Req() req: RawBodyRequest<Request>, @Headers() headers: any) {
    try {
      await this.paymentProvider.handlePaymentWebhook(req.rawBody, headers);

      return new HttpSuccessResponse(undefined, 201);
    } catch (e) {
      this.logger.error('PaymentWebhookController.handlePaymentWebook', 'Error handling payment webhook', {
        error: e.message,
      });

      throw new BadRequestException(e?.message);
    }
  }
}