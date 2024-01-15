import { Prisma } from '@prisma/client';
import TestDatabaseService from './test-database-service';
import { faker } from '@faker-js/faker/locale/en_GB';

export class TestApiKeyService {
  private readonly entity: Prisma.ApiKeyDelegate;

  constructor(databaseService: TestDatabaseService) {
    this.entity = databaseService.database.apiKey;
  }

  public async createExpiredApiKeyForUser(dentorId: string) {
    return this.entity.create({
      data: {
        dentorId,
        key: faker.string.sample(),
        expiresAt: faker.date.past(),
      },
    });
  }

  public async createValidApiKeyForUser(dentorId: string) {
    return this.entity.create({
      data: {
        dentorId,
        key: faker.string.sample(),
        expiresAt: faker.date.future(),
      },
    });
  }

  public async deleteAll(): Promise<void> {
    await this.entity.deleteMany();
  }
}