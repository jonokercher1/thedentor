import { Injectable } from '@nestjs/common';
import { CpdCertificateTemplateRepository } from '@/cpd/repositories/cpd-certificate-template.repository';
import { CpdCertificateFilters, CpdCertificateSelect, CpdCertificateTemplateWithFields } from '@/database/types/cpd';

@Injectable()
export class CpdCertificateTemplateService {
  constructor(
    private readonly cpdCertificateTemplateRepository: CpdCertificateTemplateRepository,
  ) { }

  public async getTemplateById(id: string): Promise<CpdCertificateTemplateWithFields> {
    return this.cpdCertificateTemplateRepository.findFirst({ id }, CpdCertificateTemplateRepository.DEFAULT_FIELDS);
  }

  public async getByCourseId(courseId: string): Promise<CpdCertificateTemplateWithFields> {
    return this.cpdCertificateTemplateRepository.findFirst<CpdCertificateFilters, CpdCertificateSelect>(
      { courseId },
      CpdCertificateTemplateRepository.DEFAULT_FIELDS,
    );
  }
}