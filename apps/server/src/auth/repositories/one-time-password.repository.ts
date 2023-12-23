import BaseRepository from '@/common/repositories/base.repository';
import { PrismaService } from '@/database/prisma.service';
import { Injectable } from '@nestjs/common';
import { OneTimePassword, Prisma } from '@prisma/client';
import { randomInt } from 'crypto';

@Injectable()
export class OneTimePasswordRepository extends BaseRepository<Prisma.OneTimePasswordDelegate> {
  public entity: Prisma.OneTimePasswordDelegate;
  public static readonly DEFAULT_FIELDS: Prisma.OneTimePasswordSelect = {
    id: true,
    token: true,
    userId: true,
    expiresAt: true,
    createdAt: true,
    updatedAt: true,
  };

  constructor(database: PrismaService) {
    super(database, database.oneTimePassword);
  }

  public async getUnexpiredOneTimePasswordsForUser(userId: string): Promise<OneTimePassword[]> {
    const unexpiredTokens = await this.findMany<Prisma.OneTimePasswordWhereInput, Prisma.OneTimePasswordSelect>({
      userId,
      expiresAt: {
        gte: new Date(),
      },
    });

    return unexpiredTokens;
  }

  public async markAllUsersActivePasswordsExpired(userId: string): Promise<boolean> {
    return this.updateMany<Prisma.OneTimePasswordWhereInput, Prisma.OneTimePasswordUpdateInput>({ userId }, { expiresAt: new Date() });
  }

  // TODO: move to generic base repository
  public async create(userId: string, select?: Prisma.OneTimePasswordSelect) {
    const token = randomInt(100000, 999999).toString();

    return this.entity.create({
      data: {
        token,
        userId,
      },
      select: {
        ...OneTimePasswordRepository.DEFAULT_FIELDS,
        ...select,
      },
    });
  }
}