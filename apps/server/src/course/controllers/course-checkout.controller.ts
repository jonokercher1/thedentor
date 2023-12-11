import { BadRequestException, Controller, Inject, Param, Put } from '@nestjs/common';
import { IPaymentProvider, PaymentProvider } from '@/payment/types/payment-provider';
import { ILoggingProvider } from '@/logging/logging.provider';
import { ILogger } from '@/logging/types/Logger';
import { CourseService } from '../services/course.service';
import { CourseCheckoutResponse } from '../responses/course-checkout.response';
import { User } from '@/common/decorators/current-user';
import { CurrentUser } from '@/auth/types/current-user';
import { UserService } from '@/user/services/user.service';

@Controller('course/checkout')
export class CourseCheckoutController {
  constructor(
    @Inject(ILoggingProvider)
    private readonly logger: ILogger,
    @Inject(IPaymentProvider)
    private readonly paymentProvider: PaymentProvider,
    private readonly courseService: CourseService,
    private readonly userService: UserService,
  ) { }

  @Put('/:courseId/intent')
  public async createPaymentIntent(@Param('courseId') courseId: string, @User() user: CurrentUser) {
    try {
      const course = await this.courseService.findById(courseId);
      const userData = await this.userService.getUserById(user.id);

      // TODO: prevent a user creating a payment intent for a course they already own
      const clientSecret = await this.paymentProvider.createPaymentIntent(userData, course);

      return new CourseCheckoutResponse({ clientSecret });
    } catch (e) {
      this.logger.error('CourseCheckoutController.createPaymentIntent', `Error creating payment intent for course ${courseId}`, {
        error: e.message,
      });

      throw new BadRequestException(e?.message ?? 'Unable to initalise course checkout');
    }
  }
}
