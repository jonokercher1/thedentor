import { Injectable } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { PrismaService } from '@/database/prisma.service';
import BaseRepository from '@/common/repositories/base.repository';

@Injectable()
export class CourseRepository extends BaseRepository<Prisma.CourseDelegate> {
  public static readonly DEFAULT_FIELDS: Prisma.CourseSelect = {
    id: true,
    type: true,
    price: true,
    cpdValue: true,
    name: true,
    description: true,
    startDate: true,
    endDate: true,
    featuredUntil: true,
    createdAt: true,
    updatedAt: true,
  };

  constructor(database: PrismaService) {
    super(database, database.course);
  }
}