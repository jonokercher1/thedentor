import { CourseFeedbackQuestionType as PrismaCourseFeedbackQuestionType } from '@prisma/client';

export const CourseFeedbackQuestionType = PrismaCourseFeedbackQuestionType;
export type CourseFeedbackQuestionType = (typeof CourseFeedbackQuestionType)[keyof typeof CourseFeedbackQuestionType]