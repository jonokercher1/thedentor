import { Injectable } from '@nestjs/common';
import { SubscriptionTier, SubscriptionTierName } from '@prisma/client';
import { PrismaService } from '../../database/prisma.service';

@Injectable()
export class SubscriptionTierRepository {
  constructor(private readonly database: PrismaService) { }

  public async findByName(name: SubscriptionTierName): Promise<SubscriptionTier> {
    return this.database.subscriptionTier.findUniqueOrThrow({
      where: { name },
    });
  }
}