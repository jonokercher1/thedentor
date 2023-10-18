import { CourseType } from '@/database/types/course-type';
import { IsEnum, IsOptional } from 'class-validator';

export class GetCourseCategoriesForTypeInput {
  @IsOptional()
  @IsEnum(CourseType)
  public readonly type?: CourseType;
}