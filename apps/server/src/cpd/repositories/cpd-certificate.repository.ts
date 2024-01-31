import BaseRepository from '@/common/repositories/base.repository';
import { PrismaService } from '@/database/prisma.service';
import { Injectable } from '@nestjs/common';
import { Prisma } from '@prisma/client';

@Injectable()
export class CpdCertificateRepository extends BaseRepository<Prisma.CpdCertificateDelegate> {
  public static readonly DEFAULT_FIELDS: Prisma.CpdCertificateSelect = {
    id: true,
    fileUrl: true,
    templateId: true,
    userId: true,
    courseId: true,
    createdAt: true,
    updatedAt: true,
  };

  constructor(database: PrismaService) {
    super(database, database.cpdCertificate);
  }
}