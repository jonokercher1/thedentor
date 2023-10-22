import { PrismaClient } from '@prisma/client';

export default class RoleSeeder {
  constructor(private readonly database: PrismaClient) { }

  public async run() {
    await this.database.role.createMany({
      data: [
        { name: 'Dentor' },
        { name: 'Dentist' },
      ],
      skipDuplicates: true,
    });
  }
}