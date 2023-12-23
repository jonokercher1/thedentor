import { Prisma, RoleName, User } from '@prisma/client';
import TestDatabaseService from './test-database-service';
import { faker } from '@faker-js/faker/locale/en_GB';

export class TestUserService {
  private readonly entity: Prisma.UserDelegate;

  constructor(private readonly databaseService: TestDatabaseService) {
    this.entity = databaseService.database.user;
  }

  public async createDentist(dataOverrides?: Partial<User>): Promise<User> {
    return this.createUserWithRole(RoleName.Dentist, dataOverrides);
  }

  public async createDentor(dataOverrides?: Partial<User>): Promise<User> {
    return this.createUserWithRole(RoleName.Dentor, dataOverrides);
  }

  public async createUserWithRole(role: RoleName, dataOverrides?: Partial<User>): Promise<User> {
    return this.entity.create({
      data: {
        name: faker.person.fullName(),
        email: faker.internet.email(),
        phone: faker.string.sample(11),
        gdcNumber: faker.string.sample(8),
        roleName: role,
        ...dataOverrides,
      },
    });
  }

  public async findUserByEmail(email: string): Promise<User> {
    return this.entity.findUnique({
      where: {
        email,
      },
    });
  }

  public async findUserById(id: string): Promise<User> {
    return this.entity.findUnique({
      where: {
        id,
      },
    });
  }

  public async deleteAll(): Promise<void> {
    await this.databaseService.database.course.deleteMany();
    await this.entity.deleteMany();
  }
}