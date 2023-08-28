import { Injectable } from '@nestjs/common';
import { CourseType, Prisma } from '@prisma/client';
import { PrismaService } from '@/database/prisma.service';

@Injectable()
export class CourseCategoryRepository {
  private readonly entity: Prisma.CategoryDelegate;

  constructor(database: PrismaService) {
    this.entity = database.category;
  }

  public async getByCourseType(type: CourseType) {
    return this.entity.findMany({
      where: {
        courses: {
          some: {
            type,
          },
        },
      },
    });
  }

  public async getActive() {
    return this.entity.findMany();
  }
}
