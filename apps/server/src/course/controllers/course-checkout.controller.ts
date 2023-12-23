import { BadRequestException, Body, Controller, Inject, Param, Put } from '@nestjs/common';
import { IPaymentProvider, PaymentProvider } from '@/payment/types/payment-provider';
import { ILoggingProvider } from '@/logging/logging.provider';
import { ILogger } from '@/logging/types/Logger';
import { CourseService } from '@/course/services/course.service';
import { CourseCheckoutResponse } from '../responses/course-checkout.response';
import { CurrentUser } from '@/common/decorators/current-user';
import { CurrentUser as ICurrentUser } from '@/auth/types/current-user';
import { UserService } from '@/user/services/user.service';
import { CreateCoursePurchaseIntentRequest } from '@/course/requests/create-course-purchase-intent.request';
import MissingPropertyError from '@/common/errors/common/missing-property-error';
import { Public } from '@/common/guards/public.guard';
import { UserCourseService } from '@/user/services/user-course.service';
import CourseAlreadyPurchasedError from '@/common/errors/course/course-already-purchased-error';

@Controller('course/checkout')
export class CourseCheckoutController {
  constructor(
    @Inject(ILoggingProvider) private readonly logger: ILogger,
    @Inject(IPaymentProvider) private readonly paymentProvider: PaymentProvider,
    private readonly courseService: CourseService,
    private readonly userService: UserService,
    private readonly userCourseService: UserCourseService,
  ) { }

  @Put('/:courseId/intent')
  @Public()
  public async createPaymentIntent(
    @Param('courseId') courseId: string,
    @CurrentUser() user?: ICurrentUser,
    @Body() body?: CreateCoursePurchaseIntentRequest,
  ) {
    try {
      const userEmail = user?.email ?? body.email;

      if (!userEmail) {
        throw new MissingPropertyError('CreateCoursePurchaseIntentRequest', ['email']);
      }

      const course = await this.courseService.findById(courseId);
      const userData = await this.userService.getOrCreateUserByEmail(userEmail);
      const courseIsAlreadyOwned = await this.userCourseService.isCourseOwnedByUser(course, userData);

      if (courseIsAlreadyOwned) {
        throw new CourseAlreadyPurchasedError();
      }

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
