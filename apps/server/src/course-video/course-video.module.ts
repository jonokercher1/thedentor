import { Module } from '@nestjs/common';
import { CourseVideoService } from './course-video.service';
import { CourseVideoController } from './course-video.controller';
import { DatabaseModule } from '@/database/database.module';
import { CourseVideoRepository } from './course-video.repository';

@Module({
  providers: [CourseVideoService, CourseVideoRepository],
  controllers: [CourseVideoController],
  imports: [DatabaseModule],
})
export class CourseVideoModule { }
