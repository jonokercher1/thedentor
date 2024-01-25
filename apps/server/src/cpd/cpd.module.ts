import { Module } from '@nestjs/common';
import { CpdCertificateController } from '@/cpd/controllers/cpd-certificate.controller';
import { CpdCertificateService } from '@/cpd/services/cpd-certificate.service';
import { CpdCertificateRepository } from '@/cpd/repositories/cpd-certificate.repository';
import { CpdCertificateTemplateRepository } from '@/cpd/repositories/cpd-certificate-template.repository';
import { DatabaseModule } from '@/database/database.module';
import { CourseFeedbackModule } from '@/course-feedback/course-feedback.module';
import { CourseModule } from '@/course/course.module';

@Module({
  imports: [DatabaseModule, CourseFeedbackModule, CourseModule],
  providers: [CpdCertificateService, CpdCertificateRepository, CpdCertificateTemplateRepository],
  controllers: [CpdCertificateController],
})
export class CpdModule { }
