import { Module } from '@nestjs/common';
import { CourseCategoryService } from '@/course-category/course-category.service';
import { CourseCategoryController } from '@/course-category/course-category.controller';
import { DatabaseModule } from '@/database/database.module';
import { CourseCategoryRepository } from '@/course-category/course-category.repository';

@Module({
  providers: [CourseCategoryService, CourseCategoryRepository],
  controllers: [CourseCategoryController],
  imports: [DatabaseModule],
})
export class CourseCategoryModule { }
