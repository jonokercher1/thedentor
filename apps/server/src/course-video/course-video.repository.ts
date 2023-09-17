import { Injectable } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { PrismaService } from '@/database/prisma.service';

@Injectable()
export class CourseVideoRepository {
  private readonly entity: Prisma.CourseVideosDelegate;

  constructor(database: PrismaService) {
    this.entity = database.courseVideos;
  }

  public async getByCourseId(courseId: string) {
    return this.entity.findMany({
      where: {
        courseId,
      },
      select: {
        video: {
          select: {
            url: true,
            title: true,
            description: true,
            thumbnail: {
              select: {
                id: true,
                files: {
                  select: {
                    id: true,
                    size: true,
                    name: true,
                    mime: true,
                    imageId: true,
                  },
                },
              },
            },
          },
        },
        moduleName: true,
      },
    });
  }
}
