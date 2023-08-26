import { Injectable } from '@nestjs/common';
import { Prisma, User } from '@prisma/client';
import { PrismaService } from '../../database/prisma.service';

@Injectable()
export class UserRepository {
  private readonly entity: Prisma.UserDelegate;

  // TODO: make a base repository that does this for us
  constructor(database: PrismaService) {
    this.entity = database.user;
  }

  public async findUnique(key: keyof Prisma.UserWhereInput, value: string): Promise<User> {
    return this.entity.findFirstOrThrow({
      where: {
        [key]: value,
      },
    });
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

  public async update(id: string, data: Prisma.UserUpdateInput): Promise<User> {
    return this.entity.update({
      where: { id },
      data: data,
    });
  }

  // TODO: we should break away from the database here and create our own input types
  // This is more work as we have 2 types to maintain but it decouples us from prisma
  public async create(data: Prisma.UserCreateInput): Promise<User> {
    return this.entity.create({ data });
  }
}