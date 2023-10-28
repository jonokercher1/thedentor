import { Injectable } from '@nestjs/common';
import { CourseType, Prisma } from '@prisma/client';
import { PrismaService } from '@/database/prisma.service';
import BaseRepository from '@/common/repositories/base.repository';
import { PaginationInput } from '@/common/types/pagination';
import { CourseFilters } from '@/database/types/course';

@Injectable()
export class CourseRepository extends BaseRepository<Prisma.CourseDelegate> {
  public readonly DEFAULT_FIELDS: Prisma.CourseSelect = {
    id: true,
    type: true,
    price: true,
    cpdValue: true,
    name: true,
    description: true,
    startDate: true,
    endDate: true,
    featuredUntil: true,
    createdAt: true,
    updatedAt: true,
  };

  constructor(database: PrismaService) {
    super(database, database.course);
  }

  public async getByType(
    type: CourseType,
    filters: Omit<Prisma.CourseWhereInput, 'type'>,
    paginationInput?: PaginationInput,
    select?: Prisma.CourseSelect,
  ) {
    const pagination = paginationInput.page && paginationInput.perPage ? {
      take: paginationInput.perPage,
      skip: (paginationInput.page * paginationInput.perPage) - paginationInput.perPage,
    } : undefined;

    const orderBy: any = paginationInput.orderBy && paginationInput.order ? {
      [paginationInput.orderBy]: paginationInput.order,
    } : undefined;

    return this.entity.findMany({
      where: {
        ...filters,
        type,
      },
      select: {
        ...this.DEFAULT_FIELDS,
        ...select,
      },
      orderBy,
      ...pagination,
    });
  }

  public async count(filters: CourseFilters) {
    return this.entity.count({
      where: filters,
    });
  }
}