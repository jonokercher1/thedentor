import { BadRequestException, Controller, Get, Inject, Param } from '@nestjs/common';
import { IPaymentProvider, PaymentProvider } from '@/payment/types/payment-provider';
import { ILoggingProvider } from '@/logging/logging.provider';
import { ILogger } from '@/logging/types/Logger';
import { CourseService } from '../services/course.service';
import { CourseCheckoutResponse } from '../responses/course-checkout.response';

@Controller('course/checkout')
export class CourseCheckoutController {
  constructor(
    @Inject(ILoggingProvider)
    private readonly logger: ILogger,
    @Inject(IPaymentProvider)
    private readonly paymentProvider: PaymentProvider,
    private readonly courseService: CourseService,
  ) { }

  @Get('/:courseId')
  public async getCheckoutUrl(@Param('courseId') courseId: string) {
    try {
      const course = await this.courseService.getCourseByIdToPurchase(courseId);

      const clientSecret = await this.paymentProvider.createCheckoutUrl(course.price);

      return new CourseCheckoutResponse({ clientSecret });
    } catch (e) {
      this.logger.error('CourseCheckoutController.getCheckoutUrl', `Error getting course checkout URL for course ${courseId}`, {
        error: e.message,
      });

      throw new BadRequestException(e?.message ?? 'Unable to purchase get course checkout url');
    }
  }
}
