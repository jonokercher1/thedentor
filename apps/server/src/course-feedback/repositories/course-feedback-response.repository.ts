import BaseRepository from '@/common/repositories/base.repository';
import { PrismaService } from '@/database/prisma.service';
import { Injectable } from '@nestjs/common';
import { Prisma } from '@prisma/client';

@Injectable()
export class CourseFeedbackResponseRepository extends BaseRepository<Prisma.CourseFeedbackResponseDelegate> {
  public static readonly DEFAULT_FIELDS: Prisma.CourseFeedbackResponseSelect = {
    id: true,
    userId: true,
    courseId: true,
    answers: true,
    createdAt: true,
    updatedAt: true,
  };

  constructor(database: PrismaService) {
    super(database, database.courseFeedbackResponse);
  }
}