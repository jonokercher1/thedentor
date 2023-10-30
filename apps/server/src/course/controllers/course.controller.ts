import { ILoggingProvider } from '@/logging/logging.provider';
import { ILogger } from '@/logging/types/Logger';
import { BadRequestException, Controller, Get, Inject, Query } from '@nestjs/common';
import { CourseResponse } from '../responses/course.response';
import { CourseService } from '../services/course.service';
import { GetCoursesRequest } from '../requests/get-courses.request';

@Controller('course')
export class CourseController {
  constructor(
    private readonly courseService: CourseService,
    @Inject(ILoggingProvider)
    private readonly logger: ILogger,
  ) { }

  @Get('/')
  public async getMany(@Query() getCoursesInput: GetCoursesRequest) {
    try {
      const courseFilters = { type: getCoursesInput.type };
      const courses = await this.courseService.getMany(courseFilters, getCoursesInput);
      const coursesCount = await this.courseService.count(courseFilters);

      // TODO: fix as any type
      return CourseResponse.paginate(courses as any, coursesCount, getCoursesInput.page);
    } catch (e) {
      this.logger.error('UpcomingCourseController.getByType', 'Error getting upcoming courses', {
        error: e.message,
        getCoursesInput,
      });

      throw new BadRequestException();
    }
  }
}
