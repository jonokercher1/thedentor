import { CourseService } from '@/course/services/course.service';
import { CpdCertificate } from '@/database/types/cpd';
import { UserService } from '@/user/services/user.service';
import { Injectable } from '@nestjs/common';

@Injectable()
export class CpdCertificateGenerationSerivce {
  constructor(
    private readonly userSerivce: UserService,
    private readonly courseService: CourseService,
  ) { }

  public async generateCertificateForUser(certificate: CpdCertificate): Promise<string> {
    // const user = await this.userSerivce.getUserById(certificate.userId);
    // const course = await this.courseService.findById(certificate.courseId);

    // TODO: Generate PDF and persist to storage
    return 'https://drive.google.com/file/d/1dKX35mJtaZXaZUGQcdgr3xnPZfR15yNU/view?usp=sharing';
  }
}