import { BadRequestException, Body, Controller, Get, HttpCode, Inject, NotFoundException, Param, Put } from '@nestjs/common';
import { CreateCpdCertificateRequest } from '@/cpd/requests/CreateCpdCertificate.request';
import { CurrentUser } from '@/common/decorators/current-user';
import { ICurrentUser } from '@/auth/types/current-user';
import { ILoggingProvider } from '@/logging/logging.provider';
import { ILogger } from '@/logging/types/Logger';
import EntityNotFound from '@/common/errors/entity-not-found-error';
import { CpdCertificateService } from '../services/cpd-certificate.service';
import { CourseService } from '@/course/services/course.service';
import { CpdCertificateResponse } from '@/cpd/responses/cpd-certificate.response';

@Controller('cpd-certificate')
export class CpdCertificateController {
  constructor(
    private readonly courseService: CourseService,
    private readonly cpdCertificateSerivce: CpdCertificateService,
    @Inject(ILoggingProvider) private readonly logger: ILogger,
  ) { }

  @Put('/')
  @HttpCode(200)
  public async createUserCertificateForCourse(
    @Body() request: CreateCpdCertificateRequest,
    @CurrentUser() user: ICurrentUser,
  ) {
    try {
      await this.courseService.findById(request.courseId); // We need to know the course exists and throw a useful error if not
      const certificate = await this.cpdCertificateSerivce.createCertificateForUser(request.courseId, user.id);

      return new CpdCertificateResponse(certificate);
    } catch (e) {
      this.logger.error('CpdCertificateController.createUserCertificateForCourse', 'Error creating CPD certificate for user', {
        error: e.message,
        courseId: request.courseId,
        userId: user.id,
      });

      // TODO: need to move this logic to an interceptor and remove try catches on every route
      if (e instanceof EntityNotFound) {
        throw new NotFoundException();
      }

      throw new BadRequestException();
    }
  }

  @Get('/:certificateId')
  @HttpCode(200)
  public async getUserCertificate(@CurrentUser() user: ICurrentUser, @Param('certificateId') certificateId: string) {
    try {
      const certificate = await this.cpdCertificateSerivce.getCertificateForUser(certificateId, user.id);

      return new CpdCertificateResponse(certificate);
    } catch (e) {
      this.logger.error('CpdCertificateController.getUserCertificateForCourse', 'Error getting CPD certificate for user', {
        error: e.message,
        userId: user.id,
        certificateId,
      });

      // TODO: need to move this logic to an interceptor and remove try catches on every route
      if (e instanceof EntityNotFound) {
        throw new NotFoundException();
      }

      throw new BadRequestException();
    }
  }
}
