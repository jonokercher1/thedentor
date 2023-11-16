import { PrismaClient, RoleName } from '@prisma/client';
import { faker } from '@faker-js/faker/locale/en_GB';

export default class DentorSeeder {
  constructor(private readonly database: PrismaClient) { }

  public async run() {
    console.log('Running dentor seeder');

    const now = new Date();
    await Promise.allSettled([...Array(10)].map(i => {
      return this.database.user.create({
        data: {
          name: faker.person.fullName(),
          email: faker.internet.email(),
          phone: faker.phone.number('+44##########'),
          gdcNumber: faker.number.int({ min: 100000, max: 999999 }).toString(),
          password: '$2a$12$cnnR3jI1pM97fBANzjSOH.qDF9UmhX4yiRtCuMTUgz2bTI8CWSRHO', // password
          roleName: RoleName.Dentor,
          rating: i % 2 === 0 ? 5 : 0,
          createdAt: now,
          updatedAt: now,
        },
      });
    }));
  }
}