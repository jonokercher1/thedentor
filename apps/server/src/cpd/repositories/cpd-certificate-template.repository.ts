import BaseRepository from '@/common/repositories/base.repository';
import { PrismaService } from '@/database/prisma.service';
import { Injectable } from '@nestjs/common';
import { Prisma } from '@prisma/client';

@Injectable()
export class CpdCertificateTemplateRepository extends BaseRepository<Prisma.CpdCertificateTemplateDelegate> {
  public static readonly DEFAULT_FIELDS: Prisma.CpdCertificateTemplateSelect = {
    id: true,
    fileUrl: true,
    courseId: true,
    fields: {
      select: {
        id: true,
        type: true,
        positionX: true,
        positionY: true,
      },
    },
    createdAt: true,
    updatedAt: true,
  };

  constructor(database: PrismaService) {
    super(database, database.cpdCertificateTemplate);
  }
}