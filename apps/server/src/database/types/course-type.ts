import { CourseType as PrismaCourseType } from '@prisma/client';

export const CourseType = PrismaCourseType;
export type CourseType = (typeof CourseType)[keyof typeof CourseType]