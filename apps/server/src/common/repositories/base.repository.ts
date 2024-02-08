import { PrismaService } from '@/database/prisma.service';
import { Injectable } from '@nestjs/common';
import { PaginationInput } from '@/common/types/pagination';
import { Prisma } from '@prisma/client';
import EntityNotFound from '@/common/errors/entity-not-found-error';

@Injectable()
abstract class BaseRepository<T> {
  constructor(
    protected readonly database?: PrismaService,
    protected readonly entity?: any, // TODO: workout how to make T extend a base entity type -> probably have to write our own type for this
  ) { }

  public async findFirst<Filters, Select = void>(filters: Filters, select?: Select): Promise<any> {
    const result = await this.entity.findFirst({
      where: filters,
      select,
    });

    if (!result) {
      throw new EntityNotFound(this.entity);
    }

    return result;
  }


  public async findUnique<Entity>(key: keyof Prisma.UserWhereInput, value: string): Promise<Entity> {
    return this.findFirst({ [key]: value });
  }

  public async findMany<Filters, Select>(filters: Filters, pagination?: PaginationInput, select?: Select) {
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

  public async exists<Filters>(filters: Filters) {
    const count = await this.count(filters);

    return count > 0;
  }

  public async create<Data, Entity, Select = object>(data: Data, select?: Select): Promise<Entity> {
    return this.entity.create({ data, select });
  }

  public async update<Filters, Data, Entity, Select = object>(filters: Filters, data: Data, select?: Select): Promise<Entity> {
    return this.entity.update({
      where: filters,
      data,
      select,
    });
  }

  public async updateMany<Filters, Input, Select = void>(filters: Filters, input: Input, select?: Select): Promise<any> {
    return this.entity.updateMany({
      data: input,
      where: filters,
      select,
    });
  }

  protected getPaginationParams(pagination?: PaginationInput) {
    const paginationInput = pagination?.page && pagination?.perPage ? {
      take: Number(pagination.perPage),
      skip: (Number(pagination.page) * Number(pagination.perPage)) - Number(pagination.perPage),
    } : undefined;

    const orderBy: any = pagination?.orderBy && pagination?.order ? {
      [pagination.orderBy]: pagination.order,
    } : undefined;

    return {
      orderBy,
      ...paginationInput,
    };
  }
}

export default BaseRepository;