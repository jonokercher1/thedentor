import { Injectable } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { PrismaService } from '@/database/prisma.service';

@Injectable()
export class PasswordResetRepository {
  private readonly entity: Prisma.PasswordResetTokenDelegate;

  public readonly DEFAULT_FIELDS: Prisma.PasswordResetTokenSelect = {
    id: true,
    userId: true,
    token: true,
    expiresAt: true,
    createdAt: true,
    updatedAt: true,
  };

  // TODO: make a base repository that does this for us
  constructor(database: PrismaService) {
    this.entity = database.passwordResetToken;
  }

  public async create(data: Prisma.PasswordResetTokenCreateInput, select = this.DEFAULT_FIELDS) {
    return this.entity.create({ data, select });
  }

  public async update(id: string, data: Prisma.PasswordResetTokenUpdateInput, select = this.DEFAULT_FIELDS) {
    return this.entity.update({
      where: {
        id,
      },
      data,
      select,
    });
  }

  public async updateMany(identifierKey: 'id' | 'token' | 'userId', identifierValue: string, data: Prisma.PasswordResetTokenUpdateManyMutationInput) {
    return this.entity.updateMany({
      where: {
        [identifierKey]: identifierValue,
      },
      data,
    });
  }

  public async findByToken(token: string, select = this.DEFAULT_FIELDS) {
    return this.entity.findUniqueOrThrow({
      where: {
        token,
        expiresAt: {
          gt: new Date,
        },
      },
      select,
    });
  }
}