import {
  CourseFeedbackQuestionType as PrismaCourseFeedbackQuestionType,
  CourseFeedbackQuestion as PrismaCourseFeedbackQuestion,
  CourseFeedbackResponse as PrismaCourseFeedbackResponse
} from '@prisma/client';

export const CourseFeedbackQuestionType = PrismaCourseFeedbackQuestionType;
export type CourseFeedbackQuestionType = (typeof CourseFeedbackQuestionType)[keyof typeof CourseFeedbackQuestionType]
export type CourseFeedbackQuestion = PrismaCourseFeedbackQuestion
export type CourseFeedbackResponse = PrismaCourseFeedbackResponse