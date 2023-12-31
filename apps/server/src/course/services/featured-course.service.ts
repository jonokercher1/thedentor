import { Injectable } from '@nestjs/common';
import { CourseRepository } from '@/course/repositories/course.repository';
import { CourseType } from '@prisma/client';
import { PaginationInput } from '@/common/types/pagination';
import { CourseFilters } from '@/database/types/course';
import { UserRepository } from '@/user/repositories/user.repository';

@Injectable()
export class FeaturedCourseService {
  constructor(
    private readonly courseRepository: CourseRepository,
  ) { }

  public async getByType(type: CourseType, paginationInput: PaginationInput) {
    const pagination = paginationInput ? {
      ...paginationInput,
      order: paginationInput.order ?? 'desc',
      orderBy: paginationInput.orderBy ?? 'createdAt',
    } : undefined;

    const filters = {
      type,
      featuredUntil: {
        gt: new Date(),
      },
    };

    return this.courseRepository.findMany(
      filters,
      pagination,
      {
        ...CourseRepository.DEFAULT_FIELDS,
        dentor: {
          select: UserRepository.DEFAULT_FIELDS,
        },
        category: {
          select: {
            slug: true,
            label: true,
          },
        },
      },
    );
  }

  public async countWithFilters(filters: CourseFilters) {
    return this.courseRepository.count({
      ...filters,
      featuredUntil: {
        gt: new Date(),
      },
    });
  }
}
