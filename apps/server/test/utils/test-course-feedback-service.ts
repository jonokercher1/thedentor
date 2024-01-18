import { CourseFeedbackQuestionType, Prisma } from '@prisma/client';
import TestDatabaseService from './test-database-service';
import { faker } from '@faker-js/faker/locale/en_GB';

export class TestCourseFeedbackService {
  private readonly questionsEntity: Prisma.CourseFeedbackQuestionDelegate;

  private readonly feedbackResponseEntity: Prisma.CourseFeedbackResponseDelegate;

  constructor(databaseService: TestDatabaseService) {
    this.questionsEntity = databaseService.database.courseFeedbackQuestion;
    this.feedbackResponseEntity = databaseService.database.courseFeedbackResponse;
  }

  public async createQuestionsForCourse(courseId: string, questionsToCreate = 3) {
    const questionData: Prisma.CourseFeedbackQuestionCreateManyInput[] = [];

    for (let i = 0; i < questionsToCreate; i++) {
      const randomIndex = Math.floor(Math.random() * Object.keys(CourseFeedbackQuestionType).length);
      questionData.push({
        courseId,
        question: faker.word.words(5),
        type: CourseFeedbackQuestionType[Object.keys(CourseFeedbackQuestionType)[randomIndex]],
        order: i,
      });
    }

    return this.questionsEntity.createMany({
      data: questionData,
    });
  }

  public async submitUserAnswersForCourse(userId: string, courseId: string, answers: { questionId: string, answer: string }[]) {
    return this.feedbackResponseEntity.createMany({
      data: answers.map((answer) => ({
        userId,
        courseId,
        answers: answer,
      })),
    });
  }

  public async getQuestionsForCourse(courseId: string) {
    return this.questionsEntity.findMany({ where: { courseId } });
  }

  public async getResponsesForCourseByUser(courseId: string, userId: string) {
    return this.feedbackResponseEntity.findMany({
      where: {
        courseId,
        userId,
      },
    });
  }
}