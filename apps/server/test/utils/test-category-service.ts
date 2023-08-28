import { Category, Prisma } from '@prisma/client';
import TestDatabaseService from './test-database-service';
import { faker } from '@faker-js/faker/locale/en_GB';

export class TestCategoryService {
  private readonly entity: Prisma.CategoryDelegate;

  constructor(databaseService: TestDatabaseService) {
    this.entity = databaseService.database.category;
  }

  // public async createCourseCategory(dataOverrides?: Partial<Category>) { }

  public async createCategory(dataOverrides?: Partial<Category>) {
    return this.entity.create({
      data: {
        slug: faker.string.sample(),
        label: faker.string.sample(),
        ...dataOverrides,
      },
    });
  }

  public async deleteAll() {
    return this.entity.deleteMany();
  }
}