import { Module } from '@nestjs/common';
import { CourseController } from '@/course/controllers/course.controller';
import { CourseService } from '@/course/services/course.service';
import { FeaturedCourseController } from '@/course/controllers/featured-course.controller';
import { FeaturedCourseService } from '@/course/services/featured-course.service';
import { CourseRepository } from '@/course/repositories/course.repository';
import { DatabaseModule } from '@/database/database.module';
import { SearchModule } from '@/search/search.module';

@Module({
  controllers: [CourseController, FeaturedCourseController],
  providers: [CourseService, FeaturedCourseService, CourseRepository],
  imports: [DatabaseModule, SearchModule],
})
export class CourseModule { }
