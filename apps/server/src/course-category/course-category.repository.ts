import { Injectable } from '@nestjs/common';
import { CourseType, Prisma } from '@prisma/client';
import { PrismaService } from '@/database/prisma.service';
import BaseRepository from '@/common/repositories/base.repository';
import { CategoryFilters } from '@/database/types/category';
import { PaginationInput } from '@/common/types/pagination';

@Injectable()
export class CourseCategoryRepository extends BaseRepository<Prisma.CategoryDelegate> {
  public static readonly DEFAULT_FIELDS: Prisma.CategorySelect = {
    slug: true,
    label: true,
  };

  constructor(database: PrismaService) {
    super(database, database.category);
  }

  public async getMany(filters?: CategoryFilters, pagination?: PaginationInput, select?: Prisma.CategorySelect) {
    return this.entity.findMany({
      where: filters,
      ...this.getPaginationParams(pagination),
      select: {
        ...CourseCategoryRepository.DEFAULT_FIELDS,
        ...select,
      },
    });
  }
}
