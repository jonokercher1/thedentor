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
import { SearchModule } from '@/search/search.module';
import { CourseModule } from '@/course/course.module';
import { DentorModule } from '@/dentor/dentor.module';
import { ReviewModule } from '@/review/review.module';
import { CourseFeedbackModule } from '@/course-feedback/course-feedback.module';
import { UserModule } from '@/user/user.module';
import { IsNumberOrStringConstraint } from '@/common/decorators/is-number-or-string';
import { CpdModule } from '@/cpd/cpd.module';
import { PdfModule } from '@/pdf/pdf.module';
import { StorageModule } from '@/storage/storage.module';
import { ServeStaticModule } from '@nestjs/serve-static';
import { join } from 'path';

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
    CpdModule,
    PdfModule,
    StorageModule,
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, '..', 'public'),
      serveRoot: '/public/',
      serveStaticOptions: {
        extensions: ['pdf'],
        index: false,
      },
    }),
  ],
  providers: [
    {
      provide: APP_GUARD,
      useClass: AuthGuard,
    },
    IsNumberOrStringConstraint,
  ],
})
export class AppModule { }
