import { Module } from '@nestjs/common';
import { CpdCertificateController } from '@/cpd/controllers/cpd-certificate.controller';
import { CpdCertificateService } from '@/cpd/services/cpd-certificate.service';
import { CpdCertificateRepository } from '@/cpd/repositories/cpd-certificate.repository';
import { CpdCertificateTemplateRepository } from '@/cpd/repositories/cpd-certificate-template.repository';
import { DatabaseModule } from '@/database/database.module';
import { CourseFeedbackModule } from '@/course-feedback/course-feedback.module';
import { CourseModule } from '@/course/course.module';
import { CpdCertificateGenerationSerivce } from '@/cpd/services/cpd-certificate-generation.service';
import { UserModule } from '@/user/user.module';

@Module({
  imports: [DatabaseModule, CourseFeedbackModule, CourseModule, UserModule],
  providers: [
    CpdCertificateService,
    CpdCertificateRepository,
    CpdCertificateTemplateRepository,
    CpdCertificateGenerationSerivce,
  ],
  controllers: [CpdCertificateController],
})
export class CpdModule { }
