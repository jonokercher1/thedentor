import { Prisma, Review as PrismaReview } from '@prisma/client';

export type Review = PrismaReview;
export type ReviewFilters = Prisma.ReviewWhereInput;
export type ReviewSelectFields = Prisma.ReviewSelect;