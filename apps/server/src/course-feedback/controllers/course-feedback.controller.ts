import { BadRequestException, Controller, Get, HttpCode, NotFoundException, Param, Query, Put, Inject, Body } from '@nestjs/common';
import { CourseFeedbackService } from '@/course-feedback/services/course-feedback.service';
import EntityNotFound from '@/common/errors/entity-not-found-error';
import { CourseFeedbackQuestionResponse } from '../responses/course-feedback-question.response';
import { GetUpcomingCoursesRequest } from '@/course/requests/get-upcoming-courses.request';
import { UserCourseService } from '@/user/services/user-course.service';
import { CurrentUser } from '@/common/decorators/current-user';
import { ICurrentUser } from '@/auth/types/current-user';
import { CourseNotOwnedByUserError } from '@/course/errors/course-not-owned-by-user-error';
import { PaginationInput } from '@/common/types/pagination';
import { ILoggingProvider } from '@/logging/logging.provider';
import { ILogger } from '@/logging/types/Logger';
import { SubmitCourseFeedbackAnswersRequest } from '../requests/submit-course-feedback-answers.request';
import { CourseFeedbackAnswerResponse } from '../responses/course-feedback-answer.response';

@Controller('course/:courseId/feedback')
export class CourseFeedbackController {
  constructor(
    private readonly courseFeedbackService: CourseFeedbackService,
    private readonly userCourseService: UserCourseService,
    @Inject(ILoggingProvider) private readonly logger: ILogger,
  ) { }

  @Get('/questions')
  @HttpCode(200)
  public async getCourseFeedbackQuestions(
    @Param('courseId') courseId: string,
    @Query() getUpcomingCoursesInput: GetUpcomingCoursesRequest,
    @CurrentUser() currentUser: ICurrentUser,
  ) {
    try {
      const pagination: PaginationInput = { ...getUpcomingCoursesInput, orderBy: 'order', order: 'asc' };
      const courseFeedbackQuestions = await this.courseFeedbackService.getCourseFeedbackQuestions(courseId, pagination);
      const userCanRequestQuestions = await this.userCourseService.hasUserAttendedCourse(courseId, currentUser.id);

      if (!userCanRequestQuestions) {
        throw new CourseNotOwnedByUserError(courseId, currentUser.id);
      }

      const courseFeedbackQuestionsCount = await this.courseFeedbackService.getCourseFeedbackQuestionsCount(courseId);

      return CourseFeedbackQuestionResponse.paginate(
        courseFeedbackQuestions,
        courseFeedbackQuestionsCount,
        getUpcomingCoursesInput.page ?? 1,
      );
    } catch (e) {
      this.logger.error('CourseFeedbackController.getCourseFeedbackQuestions', 'Error getting course feedback questions', {
        error: e.message,
        courseId,
        getUpcomingCoursesInput,
      });

      // TODO: need to move this logic to an interceptor and remove try catches on every route
      if (e instanceof EntityNotFound) {
        throw new NotFoundException();
      }

      throw new BadRequestException();
    }
  }

  @Put('/answers')
  @HttpCode(200)
  public async submitAnswers(
    @Param('courseId') courseId: string,
    @CurrentUser() currentUser: ICurrentUser,
    @Body() body: SubmitCourseFeedbackAnswersRequest,
  ) {
    try {
      const feedbackResponse = await this.courseFeedbackService.submitUserAnswersForCourse(currentUser.id, courseId, body.answers);

      return new CourseFeedbackAnswerResponse(feedbackResponse);
    } catch (e) {
      this.logger.error('CourseFeedbackController.submitAnswers', 'Error submitting course feedback', {
        error: e.message,
        stack: e.stack,
      });

      // TODO: need to move this logic to an interceptor and remove try catches on every route
      if (e instanceof EntityNotFound) {
        throw new NotFoundException();
      }

      throw new BadRequestException();
    }
  }
}
