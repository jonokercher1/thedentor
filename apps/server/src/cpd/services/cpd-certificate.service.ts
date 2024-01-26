import { Injectable } from '@nestjs/common';
import { CpdCertificateRepository } from '@/cpd/repositories/cpd-certificate.repository';
import { CourseFeedbackService } from '@/course-feedback/services/course-feedback.service';
import { CpdCertificate, CpdCertificateFilters, CpdCertificateSelect, CreateCpdCertificateInput } from '@/database/types/cpd';
import { MissingCourseFeedbackError } from '@/course-feedback/errors/missing-course-feedback-error';
import { CpdCertificateGenerationSerivce } from '@/cpd/services/cpd-certificate-generation.service';

@Injectable()
export class CpdCertificateService {
  constructor(
    private readonly cpdCertificateRepository: CpdCertificateRepository,
    private readonly courseFeedbackService: CourseFeedbackService,
    private readonly cpdCertificateGenerationSerivce: CpdCertificateGenerationSerivce,
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

  public async getCertificateForUser(certificateId: string, userId: string) {
    let certificate: CpdCertificate = await this.cpdCertificateRepository.findFirst<CpdCertificateFilters, CpdCertificateSelect>({
      id: certificateId,
      userId,
    });

    if (!certificate.fileUrl) {
      const fileUrl = await this.cpdCertificateGenerationSerivce.generateCertificateForUser(certificate);
      certificate = await this.cpdCertificateRepository.update<CpdCertificateFilters, Partial<CpdCertificate>, CpdCertificate>({
        id: certificateId,
      }, {
        fileUrl,
      });
    }

    return certificate;
  }
}