import { Injectable } from '@nestjs/common';
import { CpdCertificateRepository } from '@/cpd/repositories/cpd-certificate.repository';
import { CourseFeedbackService } from '@/course-feedback/services/course-feedback.service';
import { CpdCertificate, CreateCpdCertificateInput } from '@/database/types/cpd';
import { MissingCourseFeedbackError } from '@/course-feedback/errors/missing-course-feedback-error';

@Injectable()
export class CpdCertificateService {
  constructor(
    private readonly cpdCertificateRepository: CpdCertificateRepository,
    private readonly courseFeedbackService: CourseFeedbackService,
  ) { }

  public async createCertificateForUser(courseId: string, userId: string) {
    const userHasSubmittedFeedback = await this.courseFeedbackService.checkUserHasSubmittedFeedback(userId, courseId);

    if (!userHasSubmittedFeedback) {
      throw new MissingCourseFeedbackError(courseId, userId);
    }

    return this.cpdCertificateRepository.create<CreateCpdCertificateInput, CpdCertificate>({
      course: {
        connect: {
          id: courseId,
        },
      },
      user: {
        connect: {
          id: userId,
        },
      },
    });
  }

  public async getCourseCertificateForUser(courseId: string, userId: string) {
    const certificate = await this.cpdCertificateRepository.findFirst({
      courseId,
      userId,
    });

    // if (!certificate.fileUrl) {
    // generate certificate 
    // }
  }
}