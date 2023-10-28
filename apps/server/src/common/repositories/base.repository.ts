import { PrismaService } from '@/database/prisma.service';
import { Injectable } from '@nestjs/common';

@Injectable()
abstract class BaseRepository<T> {
  constructor(
    protected readonly database?: PrismaService,
    protected readonly entity?: T,
  ) { }
}

export default BaseRepository;