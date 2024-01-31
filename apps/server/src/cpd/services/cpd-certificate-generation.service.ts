import { CourseService } from '@/course/services/course.service';
import { CpdCertificate, CpdCertificateTemplateFieldType, CpdCertificateTemplateFieldWithValue, CpdCertificateTemplateWithFields } from '@/database/types/cpd';
import { UserService } from '@/user/services/user.service';
import { Injectable } from '@nestjs/common';
import { CpdCertificateTemplateService } from '@/cpd/services/cpd-certificate-template.service';
import { PdfGeneratorService } from '@/pdf/services/pdf-generator.service';
import { Course } from '@/database/types/course';
import { User } from '@/database/types/user';
import { PdfLoaderService } from '@/pdf/services/pdf-loader.service';

@Injectable()
export class CpdCertificateGenerationSerivce {
  constructor(
    private readonly userSerivce: UserService,
    private readonly courseService: CourseService,
    private readonly certificateTemplateService: CpdCertificateTemplateService,
    private readonly pdfLoaderService: PdfLoaderService,
    private readonly pdfGeneratorService: PdfGeneratorService,
  ) { }

  public async generateCertificateForUser(certificate: CpdCertificate): Promise<string> {
    const user = await this.userSerivce.getUserById(certificate.userId);
    const course = await this.courseService.findById(certificate.courseId);
    const certificateTemplate = await this.certificateTemplateService.getTemplateById(certificate.templateId);

    await this.applyValuesToCertificateTemplate(certificateTemplate, course, user);

    // TODO: Generate PDF and persist to storage
    return 'https://drive.google.com/file/d/1dKX35mJtaZXaZUGQcdgr3xnPZfR15yNU/view?usp=sharing';
  }

  private async applyValuesToCertificateTemplate(certificateTemplate: CpdCertificateTemplateWithFields, course: Course, user: User): Promise<Uint8Array> {
    const fieldsWithValues = this.mapDataToCertificateTemplate(certificateTemplate, course, user);
    const pdfRawBytes = await this.pdfLoaderService.loadFromRemoteUrl(certificateTemplate.fileUrl);
    const pdf = await this.pdfGeneratorService.load(pdfRawBytes);
    pdf.loadPage(1);

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