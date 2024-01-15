import { Module } from '@nestjs/common';
import { DentorService } from '@/dentor/services/dentor.service';
import { DentorController } from '@/dentor/controllers/dentor.controller';
import { UserRepository } from '@/user/repositories/user.repository';
import { UserModule } from '@/user/user.module';
import { DatabaseModule } from '@/database/database.module';
import { ReviewModule } from '@/review/review.module';
import { ReviewRepository } from '@/review/repositories/review.repository';
import { DentorReviewController } from '@/dentor/controllers/dentor-review.controller';
import { DentorReviewService } from '@/dentor/services/dentor-review.service';
import { CourseModule } from '@/course/course.module';
import { CourseRepository } from '@/course/repositories/course.repository';
import { DentorCourseService } from '@/dentor/services/dentor-course.service';

@Module({
  imports: [DatabaseModule, UserModule, ReviewModule, CourseModule],
  providers: [
    DentorService,
    DentorReviewService,
    UserRepository,
    ReviewRepository,
    CourseRepository,
    DentorCourseService,
  ],
  controllers: [DentorController, DentorReviewController],
})
export class DentorModule { }
