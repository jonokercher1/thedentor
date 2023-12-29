import BaseRepository from '@/common/repositories/base.repository';
import { PrismaService } from '@/database/prisma.service';
import { Injectable } from '@nestjs/common';
import { Prisma } from '@prisma/client';

@Injectable()
export class ReviewRepository extends BaseRepository<Prisma.ReviewDelegate> {
  public static readonly DEFAULT_FIELDS: Prisma.ReviewSelect = {
    id: true,
    title: true,
    content: true,
    rating: true,
    createdAt: true,
    updatedAt: true,
  };

  constructor(database: PrismaService) {
    super(database, database.review);
  }
}