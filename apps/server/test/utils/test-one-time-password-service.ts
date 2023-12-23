import { Prisma } from '@prisma/client';
import TestDatabaseService from './test-database-service';
import { faker } from '@faker-js/faker/locale/en_GB';

export class TestOneTimePasswordService {
  private readonly entity: Prisma.OneTimePasswordDelegate;

  constructor(databaseService: TestDatabaseService) {
    this.entity = databaseService.database.oneTimePassword;
  }

  public async findAllUnexpiredForUserId(userId: string) {
    return this.entity.findMany({
      where: {
        userId,
        expiresAt: {
          gt: new Date(),
        },
      },
    });
  }

  public async findAllForUserId(userId: string) {
    return this.entity.findMany({
      where: {
        userId,
      },
    });
  }

  public async createForUser(userId: string, dataOverrides?: Partial<Prisma.OneTimePasswordCreateInput>) {
    return this.entity.create({
      data: {
        token: faker.string.sample(),
        user: {
          connect: {
            id: userId,
          },
        },
        ...dataOverrides,
      },
    });
  }
}