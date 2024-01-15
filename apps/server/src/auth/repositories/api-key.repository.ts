import BaseRepository from '@/common/repositories/base.repository';
import { PrismaService } from '@/database/prisma.service';
import { Injectable } from '@nestjs/common';
import { Prisma } from '@prisma/client';

@Injectable()
export class ApiKeyRepository extends BaseRepository<Prisma.ApiKeyDelegate> {
  constructor(database: PrismaService) {
    super(database, database.apiKey);
  }
}