import { PrismaService } from '@/database/prisma.service';
import { Injectable } from '@nestjs/common';

@Injectable()
abstract class BaseRepository {
  constructor(
    protected readonly database: PrismaService,
  ) { }
}

export default BaseRepository;