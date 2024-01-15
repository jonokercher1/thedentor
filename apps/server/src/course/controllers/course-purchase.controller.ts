import { RequiresApiKey } from '@/auth/guards/api-key.guard';
import { BadRequestException, Body, Controller, HttpCode, Inject, NotFoundException, Param, Put } from '@nestjs/common';
import { CreateUserCoursePurchaseRequest } from '@/course/requests/create-user-course-purchase.request';
import { CurrentUser } from '@/common/decorators/current-user';
import { CurrentUser as ICurrentUser } from '@/auth/types/current-user';
import { ILoggingProvider } from '@/logging/logging.provider';
import { ILogger } from '@/logging/types/Logger';
import { UserService } from '@/user/services/user.service';
import { CoursePurchaseService } from '../services/course-purchase.service';
import { DentorCourseService } from '@/dentor/services/dentor-course.service';
import { InvalidCoursePurchaseAttemptError } from '../errors/invalid-course-purchase-attempt-error';
import HttpSuccessResponse from '@/common/responses/http-success.response';
import EntityNotFound from '@/common/errors/common/entity-not-found-error';

@Controller('course/:courseId/purchase')
export class CoursePurchaseController {
  constructor(
    private readonly userService: UserService,
    private readonly coursePurchaseService: CoursePurchaseService,
    private readonly dentorCourseService: DentorCourseService,
    @Inject(ILoggingProvider) private readonly logger: ILogger,
  ) { }

  @RequiresApiKey()
  @HttpCode(204)
  @Put('/')
  public async createUserCoursePurchase(
    @Param('courseId') courseId: string,
    @Body() body: CreateUserCoursePurchaseRequest,
    @CurrentUser() currentUser: ICurrentUser,
  ) {
    try {
      const courseIsOwnedByDentor = await this.dentorCourseService.isCourseOwnedByDentor(courseId, currentUser.id);

      // TODO: this cant ever happen, isCourseOwnedByDentor throws an error if the course is not owned by the dentor. This should be refactored somewhen
      if (!courseIsOwnedByDentor) {
        throw new InvalidCoursePurchaseAttemptError(`Course ${courseId} is not owned by dentor ${currentUser.id}`);
      }

      const user = await this.userService.getOrCreateUserByEmail(body.user.email, { name: body.user.name, phone: body.user.phone });

      await this.coursePurchaseService.purchaseCourseForUser(courseId, user.email);

      return new HttpSuccessResponse(undefined, 204);
    } catch (e) {
      this.logger.error('CoursePurchaseController.createUserCoursePurchase', 'Error creating user course purchase', {
        error: e.message,
        body,
        currentUser,
      });

      // TODO: need to move this logic to an interceptor and remove try catches on every route
      if (e instanceof EntityNotFound) {
        throw new NotFoundException();
      }

      throw new BadRequestException();
    }
  }
}