import { Prisma, ApiKey as PrismaApiKey } from '@prisma/client';

export type ApiKey = PrismaApiKey
export type ApiKeyFilters = Prisma.ApiKeyWhereInput
export type ApiKeySelect = Prisma.ApiKeySelect