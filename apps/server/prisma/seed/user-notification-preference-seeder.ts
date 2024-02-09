import { PrismaClient } from '@prisma/client';

export default class UserNotificationPreferenceSeeder {
  constructor(private readonly database: PrismaClient) { }

  public async run() {
    console.log('Running user notification preference seeder');

    const now = new Date();

    const users = await this.database.user.findMany({});

    for (const user of users) {
      await this.database.userNotificationPreference.create({
        data: {
          userId: user.id,
          email: true,
          sms: true,
          createdAt: now,
          updatedAt: now,
        },
      });
    }
  }
}