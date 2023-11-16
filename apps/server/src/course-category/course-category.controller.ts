import { Controller, Get, Query } from '@nestjs/common';
import { CourseCategoryService } from '@/course-category/course-category.service';
import { CourseCategoryResponse } from '@/course-category/responses/course-category.response';
import { GetCourseCategoriesForTypeInput } from '@/course-category/requests/get-course-categories-for-type.request';

@Controller('course-category')
export class CourseCategoryController {
  constructor(
    private readonly courseCategoryService: CourseCategoryService,
  ) { }

  @Get()
  public async getCourseCategories(@Query() getCourseCategoriesForTypeInpu: GetCourseCategoriesForTypeInput) {
    const categories = await this.courseCategoryService.getActiveCourseCategories(getCourseCategoriesForTypeInpu.type);

    return new CourseCategoryResponse(categories);
  }
}
