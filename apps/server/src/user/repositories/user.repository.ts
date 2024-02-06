import { Injectable } from '@nestjs/common';
import { Prisma, User } from '@prisma/client';
import { PrismaService } from '@/database/prisma.service';
import BaseRepository from '@/common/repositories/base.repository';
import { UpdateUserInput, UserFilters, UserSelect } from '@/database/types/user';

@Injectable()
export class UserRepository extends BaseRepository<Prisma.UserDelegate> {
  public static readonly DEFAULT_FIELDS: Prisma.UserSelect = {
    id: true,
    name: true,
    email: true,
    phone: true,
    gdcNumber: true,
    roleName: true,
    bio: true,
    createdAt: true,
    updatedAt: true,
  };

  constructor(database: PrismaService) {
    super(database, database.user);
  }

  public async existsWithAnyUniqueKey(email: string, gdcNumber: string): Promise<boolean> {
    const usersWithProperties = await this.entity.count({
      where: {
        OR: [
          { email },
          { gdcNumber },
        ],
      },
    });

    return usersWithProperties > 0;
  }

  // TODO: improve base repository to avoid any types
  public async update(filters: any, data: any, select?: any): Promise<any> {
    return super.update<UserFilters, UpdateUserInput, User, UserSelect>(
      filters,
      data,
      {
        ...UserRepository.DEFAULT_FIELDS,
        ...select,
      },
    );
  }
}