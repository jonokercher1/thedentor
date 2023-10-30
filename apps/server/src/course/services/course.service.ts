import { Injectable } from '@nestjs/common';
import { CourseRepository } from '@/course/repositories/course.repository';
import { PaginationInput } from '@/common/types/pagination';
import { CourseFilters } from '@/database/types/course';
import { CourseCategoryRepository } from '@/course-category/course-category.repository';
import { CourseType } from '@/database/types/course-type';

@Injectable()
export class CourseService {
  constructor(
    private readonly courseRepository: CourseRepository,
  ) { }

  public async getMany(filters?: CourseFilters, paginationInput?: PaginationInput) {
    const pagination: PaginationInput = {
      page: paginationInput.page,
      perPage: paginationInput.perPage,
      order: paginationInput?.order ?? 'desc',
      orderBy: paginationInput?.orderBy ?? 'createdAt',
    };

    return this.courseRepository.getMany(
      filters,
      pagination,
      { // TOOD: use a dentor/user repository default fields for consistent selects
        ...CourseRepository.DEFAULT_FIELDS,
        dentor: {
          select: {
            name: true,
          },
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
