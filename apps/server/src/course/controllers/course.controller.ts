import { ILoggingProvider } from '@/logging/logging.provider';
import { ILogger } from '@/logging/types/Logger';
import { BadRequestException, Controller, Get, HttpCode, Inject, NotFoundException, Param, Query, ValidationPipe } from '@nestjs/common';
import { CourseResponse } from '@/course/responses/course.response';
import { CourseService } from '@/course/services/course.service';
import { GetCoursesRequest } from '@/course/requests/get-courses.request';
import { GetUpcomingCoursesRequest } from '@/course/requests/get-upcoming-courses.request';
import { CourseType } from '@prisma/client';
import { Course, CourseFilters } from '@/database/types/course';
import { PaginationInput } from '@/common/types/pagination';
import EntityNotFound from '@/common/errors/entity-not-found-error';

@Controller('course')
export class CourseController {
  constructor(
    private readonly courseService: CourseService,
    @Inject(ILoggingProvider) private readonly logger: ILogger,
  ) { }

  @Get('/')
  // TODO: Probably best to export this to a reusable decorator @QueryWithTransformation
  public async getMany(@Query(new ValidationPipe({ transform: true })) getCoursesInput: GetCoursesRequest): Promise<CourseResponse> {
    try {
      let courses: Course[];
      let coursesCount: number;
      const courseFilters: CourseFilters = { type: getCoursesInput.type };

      if (getCoursesInput.dentors) {
        courseFilters.dentorId = { in: getCoursesInput.dentors };
      }

      if (getCoursesInput.search) {
        const searchResult = await this.courseService.getAndCountManyWithSearchTerm(getCoursesInput.search, courseFilters, getCoursesInput);
        courses = searchResult.courses;
        coursesCount = searchResult.count;
      } else {
        courses = await this.courseService.getMany(courseFilters, getCoursesInput);
        coursesCount = await this.courseService.count(courseFilters);
      }

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

  @Get('/:id')
  @HttpCode(200)
  public async getById(@Param('id') id: string): Promise<CourseResponse> {
    try {
      const course = await this.courseService.getByIdWithDentorAndCategory(id);

      return new CourseResponse(course);
    } catch (e) {
      this.logger.error('CourseController.getById', 'Error getting course', {
        error: e.message,
        courseId: id,
      });

      // TODO: need to move this logic to an interceptor and remove try catches on every route
      if (e instanceof EntityNotFound) {
        throw new NotFoundException();
      }

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
