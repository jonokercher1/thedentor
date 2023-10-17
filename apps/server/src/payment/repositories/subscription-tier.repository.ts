import { Injectable } from '@nestjs/common';
import { PrismaService } from '@/database/prisma.service';
import { SubscriptionTier, SubscriptionTierName } from '@/database/types/subscription-tier';

@Injectable()
export class SubscriptionTierRepository {
  constructor(private readonly database: PrismaService) { }

  public async findByName(name: SubscriptionTierName): Promise<SubscriptionTier> {
    return this.database.subscriptionTier.findUniqueOrThrow({
      where: { name },
    });
  }
}