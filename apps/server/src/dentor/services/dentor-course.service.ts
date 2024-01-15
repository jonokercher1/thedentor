import { CourseRepository } from '@/course/repositories/course.repository';
import { Injectable } from '@nestjs/common';

@Injectable()
export class DentorCourseService {
  constructor(private readonly courseRepository: CourseRepository) { }

  // TODO: This could be misleading as getForDentor throws an error if there is no record found, the result will always be true
  public async isCourseOwnedByDentor(courseId: string, dentorId: string): Promise<boolean> {
    const ownedCourse = await this.courseRepository.getForDentor(dentorId, courseId);

    return !!ownedCourse;
  }
}