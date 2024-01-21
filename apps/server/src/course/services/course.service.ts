import { Inject, Injectable } from '@nestjs/common';
import { CourseRepository } from '@/course/repositories/course.repository';
import { PaginationInput } from '@/common/types/pagination';
import { Course, CourseFilters } from '@/database/types/course';
import { CourseCategoryRepository } from '@/course-category/course-category.repository';
import { UserRepository } from '@/user/repositories/user.repository';
import { ISearchProvider } from '@/search/search.provider';
import { SearchClient } from '@/search/types/search-client';
import { AlgoliaCourse } from '@/search/types/algolia';
import CourseSoldOutError from '@/common/errors/course/course-sold-out-error';

@Injectable()
export class CourseService {
  // TODO: this probably doesnt live here
  private readonly defaultPagation: PaginationInput = {
    page: 1,
    perPage: 5,
    order: 'desc',
    orderBy: 'createdAt',
  };

  constructor(
    private readonly courseRepository: CourseRepository,
    @Inject(ISearchProvider)
    protected readonly searchClient?: SearchClient,
  ) { }

  public async getAndCountManyWithSearchTerm(
    term: string,
    filters?: Omit<CourseFilters, 'id'>,
    paginationInput?: PaginationInput,
  ): Promise<{ courses: Course[], count: number }> {
    const pagination = this.getPaginationFromInput(paginationInput);

    // Need to map over filters to get them into a single string eg "startDate > 1699520753 AND endDate < 1699520753"

    // TODO Send filters to algolia
    const { results, count } = await this.searchClient.search<AlgoliaCourse>(
      term,
      pagination,
      'startDate > 1699520753',
    );
    const matchingCourseIds = results.map(({ objectID }) => objectID);

    const courses = await this.getMany({
      ...filters,
      id: {
        in: matchingCourseIds,
      },
    }, paginationInput);

    return {
      courses,
      count,
    };
  }

  public async getMany(filters?: CourseFilters, paginationInput?: PaginationInput): Promise<Course[]> {
    const pagination = this.getPaginationFromInput(paginationInput);

    return this.courseRepository.findMany(
      filters,
      pagination,
      {
        ...CourseRepository.DEFAULT_FIELDS,
        dentor: {
          select: UserRepository.DEFAULT_FIELDS,
        },
        category: {
          select: CourseCategoryRepository.DEFAULT_FIELDS,
        },
      },
    );
  }

  public async count(filters?: CourseFilters) {
    return this.courseRepository.count(filters);
  }

  public async findById(courseId: string): Promise<Course> {
    return this.courseRepository.findFirst({ id: courseId });
  }

  public async getCourseByIdToPurchase(courseId: string): Promise<Course> {
    const course = await this.findById(courseId);

    if (!course.availablePlaces) {
      throw new CourseSoldOutError();
    }

    return course;
  }

  public async courseHasAvailablePlaces(courseId: string): Promise<boolean> {
    const course = await this.findById(courseId);

    return course.availablePlaces > 0;
  }

  // TODO: this probably doesnt live here
  private getPaginationFromInput(paginationInput?: PaginationInput): PaginationInput {
    return {
      ...this.defaultPagation,
      ...paginationInput,
    };
  }
}
