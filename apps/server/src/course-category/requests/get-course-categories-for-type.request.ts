import { PaginationRequest } from '@/common/requests/pagination.request';
import { CourseType } from '@/database/types/course-type';
import { IsEnum, IsOptional } from 'class-validator';

export class GetCourseCategoriesForTypeInput extends PaginationRequest {
  @IsOptional()
  @IsEnum(CourseType)
  public readonly type?: CourseType;
}