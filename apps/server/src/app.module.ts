import { Module } from '@nestjs/common';
import { DatabaseModule } from '@/database/database.module';
import { AuthModule } from '@/auth/auth.module';
import { PaymentModule } from '@/payment/payment.module';
import { ConfigModule } from '@nestjs/config';
import { APP_GUARD } from '@nestjs/core';
import { AuthGuard } from '@/auth/guards/auth.guard';
import { CourseCategoryModule } from '@/course-category/course-category.module';
import { CourseVideoModule } from '@/course-video/course-video.module';
import { FileModule } from '@/file/file.module';
import { NotificationModule } from '@/notification/notification.module';
import { SearchModule } from './search/search.module';
import { CourseModule } from './course/course.module';
import { DentorModule } from './dentor/dentor.module';
import { ReviewModule } from './review/review.module';
import { CourseFeedbackModule } from './course-feedback/course-feedback.module';
import { UserModule } from './user/user.module';
import { IsNumberOrStringConstraint } from './common/decorators/is-number-or-string';

@Module({
  imports: [
    ConfigModule.forRoot(),
    DatabaseModule,
    AuthModule,
    PaymentModule,
    CourseCategoryModule,
    CourseVideoModule,
    FileModule,
    NotificationModule,
    SearchModule,
    CourseModule,
    DentorModule,
    ReviewModule,
    CourseFeedbackModule,
    UserModule,
  ],
  providers: [
    {
      provide: APP_GUARD,
      // TODO: work out how to register the api key guard too. We may need to make a new decorator for @Auth(ApiKey, Session) or something similar
      useClass: AuthGuard,
    },
    IsNumberOrStringConstraint,
  ],
})
export class AppModule { }
