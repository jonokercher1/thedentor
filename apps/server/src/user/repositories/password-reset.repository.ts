import { Injectable } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { PrismaService } from '@/database/prisma.service';

@Injectable()
export class PasswordResetRepository {
  private readonly entity: Prisma.PasswordResetTokenDelegate;

  // TODO: make a base repository that does this for us
  constructor(database: PrismaService) {
    this.entity = database.passwordResetToken;
  }

  public async create(data: Prisma.PasswordResetTokenCreateInput) {
    return this.entity.create({ data });
  }
}