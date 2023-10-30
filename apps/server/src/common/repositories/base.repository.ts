import { PrismaService } from '@/database/prisma.service';
import { Injectable } from '@nestjs/common';
import { PaginationInput } from '@/common/types/pagination';

@Injectable()
abstract class BaseRepository<T> {
  constructor(
    protected readonly database?: PrismaService,
    protected readonly entity?: any, // TODO: workout how to make T extend a base entity type -> probably have to write our own type for this
  ) { }

  public async getMany<Filters, Select>(filters: Filters, pagination?: PaginationInput, select?: Select) {
    return this.entity.findMany({
      where: filters,
      select,
      ...this.getPaginationParams(pagination),
    });
  }

  public async count<Filters>(filters: Filters) {
    return this.entity.count({
      where: filters,
    });
  }

  protected getPaginationParams(pagination: PaginationInput) {
    const paginationInput = pagination.page && pagination.perPage ? {
      take: pagination.perPage,
      skip: (pagination.page * pagination.perPage) - pagination.perPage,
    } : undefined;

    const orderBy: any = pagination.orderBy && pagination.order ? {
      [pagination.orderBy]: pagination.order,
    } : undefined;

    return {
      orderBy,
      ...paginationInput,
    };
  }
}

export default BaseRepository;