
import { Injectable } from '@nestjs/common';
import { CourseFeedbackQuestionsRepository } from '../repositories/course-feedback-questions.repository';
import { CourseService } from '@/course/services/course.service';
import EntityNotFound from '@/common/errors/common/entity-not-found-error';
import { PaginationInput } from '@/common/types/pagination';
import { CourseFeedbackResponseRepository } from '../repositories/course-feedback-response.repository';
import { UserCourseService } from '@/user/services/user-course.service';
import { InvalidCourseFeedbackSubmissionError } from '../errors/invalid-course-feedback-submission-error';
import { CourseFeedbackQuestion } from '@/database/types/course-feedback';
import { InvalidFeedbackQuestionError } from '../errors/invalid-feedback-question-error';

// TODO: extract this
type CourseFeedbackResponseData = { questionId: string, answer: string | number };

@Injectable()
export class CourseFeedbackService {
  constructor(
    private readonly courseFeedbackQuestionsRepository: CourseFeedbackQuestionsRepository,
    private readonly courseFeedbackResponseRepository: CourseFeedbackResponseRepository,
    private readonly courseService: CourseService,
    private readonly userCourseService: UserCourseService,
  ) { }

  public async getCourseFeedbackQuestions(courseId: string, pagination?: PaginationInput) {
    const course = await this.courseService.findById(courseId);

    // TODO: encapsulate this logic in the base repository
    if (!course) {
      throw new EntityNotFound('course', 'course does not exist');
    }

    return this.courseFeedbackQuestionsRepository.findMany({ courseId }, pagination);
  }

  // TOOD: we need to make a decision on passing around entire objects or just IDs
  public async getCourseFeedbackQuestionsCount(courseId: string) {
    const course = await this.courseService.findById(courseId);

    // TODO: encapsulate this logic in the base repository
    if (!course) {
      throw new EntityNotFound('course', 'course does not exist');
    }

    return this.courseFeedbackQuestionsRepository.count({ courseId });
  }

  public async submitUserAnswersForCourse(userId: string, courseId: string, answers: CourseFeedbackResponseData[]) {
    await this.courseService.findById(courseId); // Need to ensure the course exists

    const userCanSubmitFeedback = await this.userCanSubmitCourseFeedback(userId, courseId);

    if (!userCanSubmitFeedback) {
      throw new InvalidCourseFeedbackSubmissionError(userId, courseId);
    }

    const formattedAnswers = await this.injectQuestionDataIntoResponse(answers);

    return this.courseFeedbackResponseRepository.create({
      userId,
      courseId,
      answers: formattedAnswers,
    });
  }

  public async getCourseFeedbackResponseForUser(userId: string, courseId: string) {
    return this.courseFeedbackResponseRepository.exists({ userId, courseId });
  }

  public async userCanSubmitCourseFeedback(userId: string, courseId: string) {
    const userHasAlreadySubmittedFeedback = await this.getCourseFeedbackResponseForUser(userId, courseId);
    const userHasAttendedCourse = await this.userCourseService.hasUserAttendedCourse(courseId, userId);

    return userHasAttendedCourse && !userHasAlreadySubmittedFeedback;
  }

  private async injectQuestionDataIntoResponse(answers: CourseFeedbackResponseData[]) {
    return Promise.all(answers.map(async ({ questionId, answer }) => {
      const question = await this.courseFeedbackQuestionsRepository
        .findUnique<CourseFeedbackQuestion>('id', questionId)
        .catch(() => {
          throw new InvalidFeedbackQuestionError(questionId);
        });

      return {
        questionId,
        question: question.question,
        answer,
      };
    }));
  }
}