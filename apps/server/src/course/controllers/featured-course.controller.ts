import { CourseType } from '@/database/types/course-type';
import { Controller, Get, Inject, Param, ParseEnumPipe, Query } from '@nestjs/common';
import { GetFeaturedCoursesRequest } from '../requests/get-featured-courses.request';
import { FeaturedCourseService } from '../services/featured-course.service';
import { ILoggingProvider } from '@/logging/logging.provider';
import { ILogger } from '@/logging/types/Logger';
import { CourseResponse } from '../responses/course.response';

@Controller('course/featured')
export class FeaturedCourseController {
  constructor(
    private readonly featuredCourseService: FeaturedCourseService,
    @Inject(ILoggingProvider)
    private readonly logger: ILogger,
  ) { }

  @Get('/:type')
  public async getByType(
    @Param('type', new ParseEnumPipe(CourseType)) type: CourseType,
    @Query() featuredCourseInput: GetFeaturedCoursesRequest,
  ) {
    try {
      const featuredCourses = await this.featuredCourseService.getByType(type, featuredCourseInput);
      const featuredCourseCount = await this.featuredCourseService.countWithFilters({ type });

      return CourseResponse.paginate(featuredCourses as any, featuredCourseCount, featuredCourseInput.page);
    } catch (e) {
      this.logger.error('FeaturedCourseController.getByType', `Error getting course by type ${type}`, {
        error: e.message,
        type,
        featuredCourseInput,
      });
    }
  }
}
