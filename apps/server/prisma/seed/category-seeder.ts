import { PrismaClient } from '@prisma/client';

export default class CategorySeeder {
  constructor(private readonly database: PrismaClient) { }

  public async run() {
    console.log('Running category seeder');

    console.log('Deleting existing categories...');
    await this.deleteAll();
    console.log('Cleared Categories ✅');

    const now = new Date();

    await this.database.category.createMany({
      data: [
        { label: 'Restorative Dentistry', slug: 'restorative-dentistry', createdAt: now, updatedAt: now },
        { label: 'Aesthetic Dentistry', slug: 'aesthetic-dentistry', createdAt: now, updatedAt: now },
        { label: 'Orthodontics', slug: 'orthodontics', createdAt: now, updatedAt: now },
        { label: 'Facal Aesthetics', slug: 'facal-aesthetics', createdAt: now, updatedAt: now },
      ],
      skipDuplicates: true,
    });
  }

  private async deleteAll() {
    await this.database.category.deleteMany({});
  }
}