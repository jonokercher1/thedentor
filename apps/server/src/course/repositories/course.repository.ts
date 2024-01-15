import { Injectable } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { PrismaService } from '@/database/prisma.service';
import BaseRepository from '@/common/repositories/base.repository';
import { CourseFilters } from '@/database/types/course';

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

  public async getForDentor(dentorId: string, courseId: string): Promise<Prisma.CourseDelegate | null> {
    return this.findFirst<CourseFilters>({
      id: courseId,
      dentorId,
    });
  }
}