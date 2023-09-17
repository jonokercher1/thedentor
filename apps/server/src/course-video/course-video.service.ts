import { Injectable } from '@nestjs/common';
import { CourseVideoRepository } from './course-video.repository';

@Injectable()
export class CourseVideoService {
  constructor(
    private readonly courseVideoRepository: CourseVideoRepository,
  ) { }

  public async getByCourseId(courseId: string) {
    return this.courseVideoRepository.getByCourseId(courseId);
  }
}
