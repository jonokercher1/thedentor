import { Injectable } from '@nestjs/common';
import { Prisma, User } from '@prisma/client';
import { PrismaService } from '@/database/prisma.service';
import BaseRepository from '@/common/repositories/base.repository';

@Injectable()
export class UserRepository extends BaseRepository<Prisma.UserDelegate> {
  public static readonly DEFAULT_FIELDS: Prisma.UserSelect = {
    id: true,
    name: true,
    email: true,
    phone: true,
    gdcNumber: true,
    roleName: true,
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

  public async update(id: string, data: Prisma.UserUpdateInput, select?: Prisma.UserSelect): Promise<User> {
    return this.entity.update({
      where: { id },
      data: data,
      select: {
        ...UserRepository.DEFAULT_FIELDS,
        ...select,
      },
    });
  }

  public async create(data: Prisma.UserCreateInput): Promise<User> {
    return this.entity.create({ data });
  }
}