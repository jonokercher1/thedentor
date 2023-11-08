import { Inject, Injectable } from '@nestjs/common';
import { CourseRepository } from '@/course/repositories/course.repository';
import { PaginationInput } from '@/common/types/pagination';
import { CourseFilters } from '@/database/types/course';
import { CourseCategoryRepository } from '@/course-category/course-category.repository';
import { UserRepository } from '@/user/repositories/user.repository';
import { ISearchProvider } from '@/search/search.provider';
import { SearchClient } from '@/search/types/search-client';
import { AlgoliaCourse } from '@/search/types/algolia';

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

  public async getManyWithSearchTerm(term: string, filters?: Omit<CourseFilters, 'id'>, paginationInput?: PaginationInput) {
    const pagination = this.getPaginationFromInput(paginationInput);

    // TODO Send filters to algolia
    const matchingCourses = await this.searchClient.search<AlgoliaCourse>(term, pagination);
    const matchingCourseIds = matchingCourses.map(({ objectID }) => objectID);

    return this.getMany({
      ...filters,
      id: {
        in: matchingCourseIds,
      },
    }, paginationInput);
  }

  public async getMany(filters?: CourseFilters, paginationInput?: PaginationInput) {
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

  // TODO: this probably doesnt live here
  private getPaginationFromInput(paginationInput?: PaginationInput): PaginationInput {
    return {
      ...this.defaultPagation,
      ...paginationInput,
    };
  }
}
