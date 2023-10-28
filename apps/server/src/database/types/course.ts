import { Course as PrismaCourse, Prisma } from '@prisma/client';

export type Course = PrismaCourse;
export type CourseFilters = Prisma.CourseWhereInput;