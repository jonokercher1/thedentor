import { PrismaClient, RoleName } from '@prisma/client';

export default class UserSeeder {
  constructor(private readonly database: PrismaClient) { }

  public async run() {
    console.log('Running user seeder');
    const now = new Date();

    await this.database.user.createMany({
      data: [
        {
          name: 'John Doe',
          email: 'hello@thedentor.com',
          phone: '+4412345678910',
          gdcNumber: '123456',
          roleName: RoleName.Dentist,
          createdAt: now,
          updatedAt: now,
        },
      ],
      skipDuplicates: true,
    });
  }
}