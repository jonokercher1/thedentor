import { Module, forwardRef } from '@nestjs/common';
import { CourseController } from '@/course/controllers/course.controller';
import { CourseService } from '@/course/services/course.service';
import { FeaturedCourseController } from '@/course/controllers/featured-course.controller';
import { FeaturedCourseService } from '@/course/services/featured-course.service';
import { CourseRepository } from '@/course/repositories/course.repository';
import { DatabaseModule } from '@/database/database.module';
import { SearchModule } from '@/search/search.module';
import { CourseCheckoutController } from './controllers/course-checkout.controller';
import { PaymentModule } from '@/payment/payment.module';
import { UserModule } from '@/user/user.module';
import { CoursePurchaseController } from '@/course/controllers/course-purchase.controller';
import { CoursePurchaseService } from '@/course/services/course-purchase.service';
import { DentorCourseService } from '@/dentor/services/dentor-course.service';

@Module({
  controllers: [
    CourseController,
    FeaturedCourseController,
    CourseCheckoutController,
    CoursePurchaseController,
  ],
  providers: [
    CourseService,
    FeaturedCourseService,
    CourseRepository,
    CoursePurchaseService,
    DentorCourseService,
  ],
  imports: [
    DatabaseModule,
    SearchModule,
    forwardRef(() => CourseModule),
    forwardRef(() => PaymentModule),
    UserModule,
  ],
  exports: [CourseService],
})
export class CourseModule { }
