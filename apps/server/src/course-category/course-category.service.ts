import { Injectable } from '@nestjs/common';
import { CourseCategoryRepository } from '@/course-category/course-category.repository';
import { CourseType } from '@/database/types/course-type';

@Injectable()
export class CourseCategoryService {
  constructor(
    private readonly courseCategoryRepository: CourseCategoryRepository,
  ) { }

  public async getActiveCourseCategories(type?: CourseType) {
    if (!type) {
      return this.courseCategoryRepository.getActive();
    }

    return this.courseCategoryRepository.getByCourseType(type);
  }
}
