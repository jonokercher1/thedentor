import { Module } from '@nestjs/common';
import { CourseFeedbackController } from '@/course-feedback/controllers/course-feedback.controller';
import { CourseFeedbackService } from '@/course-feedback/services/course-feedback.service';
import { CourseFeedbackQuestionsRepository } from '@/course-feedback/repositories/course-feedback-questions.repository';
import { CourseService } from '@/course/services/course.service';
import { CourseModule } from '@/course/course.module';
import { CourseFeedbackResponseRepository } from './repositories/course-feedback-response.repository';
import { UserCourseService } from '@/user/services/user-course.service';
import { DatabaseModule } from '@/database/database.module';
import { CourseRepository } from '@/course/repositories/course.repository';
import { SearchModule } from '@/search/search.module';
import { UserModule } from '@/user/user.module';
import { UserRepository } from '@/user/repositories/user.repository';

@Module({
  controllers: [CourseFeedbackController],
  providers: [
    CourseFeedbackService,
    CourseFeedbackQuestionsRepository,
    CourseService,
    CourseRepository,
    CourseFeedbackResponseRepository,
    UserCourseService,
    UserRepository,
  ],
  imports: [CourseModule, DatabaseModule, SearchModule, UserModule],
  exports: [CourseFeedbackService],
})
export class CourseFeedbackModule { }
