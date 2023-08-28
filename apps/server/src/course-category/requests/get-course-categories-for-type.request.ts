import { CourseType } from '@prisma/client';
import { IsEnum, IsOptional } from 'class-validator';

export class GetCourseCategoriesForTypeInput {
  @IsOptional()
  @IsEnum(CourseType)
  public readonly type?: CourseType;
}