import { CourseService } from '@/course/services/course.service';
import { CpdCertificate, CpdCertificateTemplateFieldType, CpdCertificateTemplateFieldWithValue, CpdCertificateTemplateWithFields } from '@/database/types/cpd';
import { UserService } from '@/user/services/user.service';
import { Inject, Injectable } from '@nestjs/common';
import { CpdCertificateTemplateService } from '@/cpd/services/cpd-certificate-template.service';
import { PdfGeneratorService } from '@/pdf/services/pdf-generator.service';
import { Course } from '@/database/types/course';
import { User } from '@/database/types/user';
import { IStorageClient } from '@/storage/storage.provider';
import { StorageClient } from '@/storage/types/storage-client';
import { PdfLoader } from '@/pdf/types/pdf-loader';
import { IPdfLoaderProvider } from '@/pdf/pdf-loader.provider';

@Injectable()
export class CpdCertificateGenerationSerivce {
  constructor(
    private readonly userSerivce: UserService,
    private readonly courseService: CourseService,
    private readonly certificateTemplateService: CpdCertificateTemplateService,
    private readonly pdfGeneratorService: PdfGeneratorService,
    @Inject(IStorageClient) private readonly storageClient: StorageClient,
    @Inject(IPdfLoaderProvider) private readonly pdfLoaderService: PdfLoader,
  ) { }

  public async generateCertificateForUser(certificate: CpdCertificate): Promise<string> {
    const user = await this.userSerivce.getUserById(certificate.userId);
    const course = await this.courseService.findById(certificate.courseId);
    const certificateTemplate = await this.certificateTemplateService.getByCourseId(certificate.courseId);

    const certificatePdf = await this.applyValuesToCertificateTemplate(certificateTemplate, course, user);
    const certificateStoragePath = await this.storageClient.storeFile(
      `course-${course.id}-${user.id}-cpd-certificate.pdf`,
      `courses/${course.id}/cpd-certificates/${user.id}`,
      certificatePdf,
    );

    return certificateStoragePath;
  }

  private async applyValuesToCertificateTemplate(certificateTemplate: CpdCertificateTemplateWithFields, course: Course, user: User): Promise<Uint8Array> {
    const fieldsWithValues = this.mapDataToCertificateTemplate(certificateTemplate, course, user);
    const pdfRawBytes = await this.pdfLoaderService.loadFromUrl(certificateTemplate.fileUrl);
    const pdf = await this.pdfGeneratorService.load(pdfRawBytes);
    pdf.loadPage(0);

    fieldsWithValues.forEach(field => {
      pdf.addText(field.value, field.positionX, field.positionY);
    });

    return pdf.save();
  }

  private mapDataToCertificateTemplate(certificateTemplate: CpdCertificateTemplateWithFields, course: Course, user: User): CpdCertificateTemplateFieldWithValue[] {
    return certificateTemplate.fields.map(field => {
      switch (field.type) {
        case CpdCertificateTemplateFieldType.CourseName:
          return {
            ...field,
            value: course.name,
          };

        case CpdCertificateTemplateFieldType.DentorName:
          return {
            ...field,
            value: user.name,
          };

        case CpdCertificateTemplateFieldType.DentorGdcNumber:
          return {
            ...field,
            value: user.gdcNumber,
          };

        case CpdCertificateTemplateFieldType.CourseObjectives:
          return {
            ...field,
            value: course.description, // TODO: when objectives are added come back and add them here
          };

        default:
          return undefined;
      }
    });
  }
}