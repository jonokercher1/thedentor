import BaseRepository from '@/common/repositories/base.repository';
import { PrismaService } from '@/database/prisma.service';
import { Injectable } from '@nestjs/common';
import { Prisma } from '@prisma/client';

@Injectable()
export class UserNotificationPreferenceRepository extends BaseRepository<Prisma.UserNotificationPreferenceDelegate> {
  public static readonly DEFAULT_FIELDS: Prisma.UserNotificationPreferenceSelect = {
    id: true,
    userId: true,
    email: true,
    sms: true,
    createdAt: true,
    updatedAt: true,
  };

  constructor(database: PrismaService) {
    super(database, database.userNotificationPreference);
  }

  public async getUserNotificationPreferences(userId: string) {
    return this.entity.findFirst({
      where: {
        userId,
      },
      select: UserNotificationPreferenceRepository.DEFAULT_FIELDS,
    });
  }
}