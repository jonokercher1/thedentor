import { Prisma, RoleName, User } from '@prisma/client';
import TestDatabaseService from './TestDatabaseService';
import { faker } from '@faker-js/faker/locale/en_GB';
import * as bcrypt from 'bcrypt';

export class TestUserService {
  private readonly entity: Prisma.UserDelegate;

  constructor(databaseService: TestDatabaseService) {
    this.entity = databaseService.database.user;
  }

  public async createDentist(dataOverrides?: Partial<User>) {
    return this.createUserWithRole(RoleName.Dentist, dataOverrides);
  }

  public async createDentor(dataOverrides?: Partial<User>) {
    return this.createUserWithRole(RoleName.Dentor, dataOverrides);
  }

  public async createUserWithRole(role: RoleName, dataOverrides?: Partial<User>) {
    const password = await bcrypt.hash(dataOverrides?.password ?? faker.internet.password({ length: 10 }), 10);

    return this.entity.create({
      data: {
        name: faker.person.fullName(),
        email: faker.internet.email(),
        phone: faker.string.sample(11),
        gdcNumber: faker.string.sample(8),
        roleName: role,
        ...dataOverrides,
        password,
      },
    });
  }
}