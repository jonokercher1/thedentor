import { Injectable } from '@nestjs/common';
import { UserService } from '@/user/services/user.service';
import { UserCourseService } from '@/user/services/user-course.service';
import { InvalidCoursePurchaseAttemptError } from '../errors/invalid-course-purchase-attempt-error';
import { CourseService } from './course.service';


@Injectable()
export class CoursePurchaseService {
  constructor(
    private readonly userService: UserService,
    private readonly userCourseService: UserCourseService,
    private readonly courseService: CourseService,
  ) { }

  public async purchaseCourseForUser(courseId: string, userEmail: string): Promise<void> {
    const user = await this.userService.getUserByEmail(userEmail);
    const userCanPurchaseCourse = await this.canCourseBePurchasedByUser(courseId, user.id);

    if (!userCanPurchaseCourse) {
      throw new InvalidCoursePurchaseAttemptError(`User ${user.id} cannot purchase course ${courseId}`);
    }

    await this.userCourseService.attachCourseToUser(courseId, user.id);
  }

  public async canCourseBePurchasedByUser(courseId: string, userId: string): Promise<boolean> {
    const isCourseAlreadyOwned = await this.userCourseService.isCourseOwnedByUser(courseId, userId);
    const courseHasAvailableSpaces = await this.courseService.courseHasAvailablePlaces(courseId);

    return !isCourseAlreadyOwned && courseHasAvailableSpaces;
  }
}