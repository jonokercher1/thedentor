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
  ],
  controllers: [],
  providers: [
    {
      provide: APP_GUARD,
      useClass: AuthGuard,
    },
  ],
})
export class AppModule { }
