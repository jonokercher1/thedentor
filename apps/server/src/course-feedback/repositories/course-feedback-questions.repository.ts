import BaseRepository from '@/common/repositories/base.repository';
import { PrismaService } from '@/database/prisma.service';
import { Injectable } from '@nestjs/common';
import { Prisma } from '@prisma/client';

@Injectable()
export class CourseFeedbackQuestionsRepository extends BaseRepository<Prisma.CourseFeedbackQuestionDelegate> {
  public static readonly DEFAULT_FIELDS: Prisma.CourseFeedbackQuestionSelect = {
    id: true,
    type: true,
    createdAt: true,
    updatedAt: true,
  };

  constructor(database: PrismaService) {
    super(database, database.courseFeedbackQuestion);
  }
}