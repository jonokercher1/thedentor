import { SubscriptionTierName as PrismaSubscriptionTierName, SubscriptionTier as PrismaSubscriptionTier } from '@prisma/client';

export type SubscriptionTier = PrismaSubscriptionTier;

export const SubscriptionTierName = PrismaSubscriptionTierName;

export type SubscriptionTierName = (typeof SubscriptionTierName)[keyof typeof SubscriptionTierName];