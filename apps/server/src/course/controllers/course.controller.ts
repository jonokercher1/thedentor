import { ILoggingProvider } from '@/logging/logging.provider';
import { ILogger } from '@/logging/types/Logger';
import { BadRequestException, Controller, Get, Inject, Query } from '@nestjs/common';
import { CourseResponse } from '@/course/responses/course.response';
import { CourseService } from '@/course/services/course.service';
import { GetCoursesRequest } from '@/course/requests/get-courses.request';
import { GetUpcomingCoursesRequest } from '@/course/requests/get-upcoming-courses.request';
import { CourseType } from '@prisma/client';
import { CourseFilters } from '@/database/types/course';
import { PaginationInput } from '@/common/types/pagination';

@Controller('course')
export class CourseController {
  constructor(
    private readonly courseService: CourseService,
    @Inject(ILoggingProvider)
    private readonly logger: ILogger,
  ) { }

  @Get('/')
  public async getMany(@Query() getCoursesInput: GetCoursesRequest): Promise<CourseResponse> {
    try {
      let courses;
      const courseFilters: CourseFilters = { type: getCoursesInput.type };

      if (getCoursesInput.search) {
        courses = await this.courseService.getManyWithSearchTerm(getCoursesInput.search, courseFilters, getCoursesInput);
      } else {
        courses = await this.courseService.getMany(courseFilters, getCoursesInput);
      }

      console.log('🚀 ~ file: course.controller.ts:25 ~ CourseController ~ getMany ~ courses:', courses);
      // TODO: When a search is sent, we need to pass the request to algolia and then map in the IDs returned to our
      // service so we can return full objects

      // TOOD: need to workout how to do this with search term
      const coursesCount = await this.courseService.count(courseFilters);

      // TODO: fix as any type
      return CourseResponse.paginate(courses as any, coursesCount, getCoursesInput.page);
    } catch (e) {
      this.logger.error('CourseController.getMany', 'Error getting courses', {
        error: e.message,
        getCoursesInput,
      });

      throw new BadRequestException();
    }
  }

  @Get('/in-person/upcoming')
  public async getUpcoming(@Query() getUpcomingCoursesInput: GetUpcomingCoursesRequest): Promise<CourseResponse> {
    try {
      const courseFilters: CourseFilters = { type: CourseType.InPerson, startDate: { gte: new Date } };
      const pagination: PaginationInput = { ...getUpcomingCoursesInput, order: 'asc', orderBy: 'startDate' };

      const courses = await this.courseService.getMany(courseFilters, pagination);
      const coursesCount = await this.courseService.count(courseFilters);

      // TODO: fix as any type
      return CourseResponse.paginate(courses as any, coursesCount, pagination.page);
    } catch (e) {
      this.logger.error('CourseController.getUpcoming', 'Error getting upcoming courses', {
        error: e.message,
        getUpcomingCoursesInput,
      });

      throw new BadRequestException();
    }
  }
}
