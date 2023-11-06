import { PaginationRequest } from '@/common/requests/pagination.request';
import { CourseType } from '@prisma/client';
import { IsEnum, IsOptional, IsString } from 'class-validator';

export class GetCoursesRequest extends PaginationRequest {
  @IsOptional()
  @IsEnum(CourseType)
  public readonly type?: CourseType;

  @IsOptional()
  @IsString()
  public readonly search?: string;

  @IsOptional()
  public readonly categories?: string[];
}