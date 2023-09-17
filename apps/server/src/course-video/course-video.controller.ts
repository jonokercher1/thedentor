import { Controller, Get, Param } from '@nestjs/common';
import { CourseVideoService } from './course-video.service';
import { CourseVideoResponse } from './responses/course-video.response';

@Controller('course-video')
export class CourseVideoController {
  constructor(
    private readonly courseVideoService: CourseVideoService,
  ) { }

  @Get('/:courseId')
  public async getByCourseId(@Param('courseId') courseId: string) {
    const courseVideos = await this.courseVideoService.getByCourseId(courseId);

    return new CourseVideoResponse(courseVideos);
  }
}
