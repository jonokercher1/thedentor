import { Inject, Injectable } from '@nestjs/common';
import { CpdCertificateRepository } from '@/cpd/repositories/cpd-certificate.repository';
import { CourseFeedbackService } from '@/course-feedback/services/course-feedback.service';
import { CpdCertificate, CpdCertificateFilters, CpdCertificateSelect, CreateCpdCertificateInput } from '@/database/types/cpd';
import { MissingCourseFeedbackError } from '@/course-feedback/errors/missing-course-feedback-error';
import { CpdCertificateGenerationSerivce } from '@/cpd/services/cpd-certificate-generation.service';
import { IStorageClient } from '@/storage/storage.provider';
import { StorageClient } from '@/storage/types/storage-client';

@Injectable()
export class CpdCertificateService {
  constructor(
    private readonly cpdCertificateRepository: CpdCertificateRepository,
    private readonly courseFeedbackService: CourseFeedbackService,
    private readonly cpdCertificateGenerationSerivce: CpdCertificateGenerationSerivce,
    @Inject(IStorageClient) private readonly storageClient: StorageClient,
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
      const storagePath = await this.cpdCertificateGenerationSerivce.generateCertificateForUser(certificate);
      certificate = await this.cpdCertificateRepository.update<CpdCertificateFilters, Partial<CpdCertificate>, CpdCertificate>({
        id: certificateId,
      }, {
        fileUrl: storagePath,
      });
    }

    // TOOD: it would be better to have this transformation in the response class - need a better response pattern to do this
    const resolvedFileUrl = this.storageClient.generateUrlFromPath(certificate.fileUrl);

    return {
      ...certificate,
      fileUrl: resolvedFileUrl,
    };
  }
}