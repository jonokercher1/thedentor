
import { Injectable } from '@nestjs/common';
import { CourseFeedbackQuestionsRepository } from '../repositories/course-feedback-questions.repository';
import { CourseService } from '@/course/services/course.service';
import EntityNotFound from '@/common/errors/common/entity-not-found-error';
import { PaginationInput } from '@/common/types/pagination';
import { CourseFeedbackResponseRepository } from '../repositories/course-feedback-response.repository';
import { UserCourseService } from '@/user/services/user-course.service';

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

  public async submitUserAnswersForCourse(userId: string, courseId: string) {
    const course = await this.courseService.findById(courseId);

    // TODO: encapsulate this logic in the base repository
    if (!course) {
      throw new EntityNotFound('course', 'course does not exist');
    }

    const userHasAlreadySubmittedFeedback = await this.getCourseFeedbackResponseForUser(userId, courseId);
    const userHasAttendedCourse = await this.userCourseService.hasUserAttendedCourse(course.id, userId);

    // Save answers

  }

  public async getCourseFeedbackResponseForUser(userId: string, courseId: string) {
    return this.courseFeedbackResponseRepository.exists({ userId, courseId });
  }
}