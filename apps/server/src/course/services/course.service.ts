import { Inject, Injectable } from '@nestjs/common';
import { CourseRepository } from '@/course/repositories/course.repository';
import { PaginationInput } from '@/common/types/pagination';
import { CourseFilters } from '@/database/types/course';
import { CourseCategoryRepository } from '@/course-category/course-category.repository';
import { UserRepository } from '@/user/repositories/user.repository';
import { ISearchProvider } from '@/search/search.provider';
import { SearchClient } from '@/search/types/search-client';

@Injectable()
export class CourseService {
  constructor(
    private readonly courseRepository: CourseRepository,
    @Inject(ISearchProvider)
    protected readonly searchClient?: SearchClient,
  ) { }

  public async getManyWithSearchTerm(term: string, filters?: Omit<CourseFilters, 'id'>, paginationInput?: PaginationInput) {
    // Send term and pagination to algolia
    // Get back IDs 
    // Call getMany with an id IN filter (...algoliaReturnedIds)
    // return result of getMany
  }

  public async getMany(filters?: CourseFilters, paginationInput?: PaginationInput) {
    const pagination: PaginationInput = {
      page: paginationInput.page,
      perPage: paginationInput.perPage,
      order: paginationInput?.order ?? 'desc',
      orderBy: paginationInput?.orderBy ?? 'createdAt',
    };

    return this.courseRepository.findMany(
      filters,
      pagination,
      { // TOOD: use a dentor/user repository default fields for consistent selects
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
}
