import { PaginationRequest } from '@/common/requests/pagination.request';
import { CourseType } from '@prisma/client';
import { Transform, Type } from 'class-transformer';
import { IsArray, IsEnum, IsOptional, IsString } from 'class-validator';

export class GetCoursesRequest extends PaginationRequest {
  @IsOptional()
  @IsEnum(CourseType)
  public readonly type?: CourseType;

  @IsOptional()
  @IsString()
  public readonly search?: string;

  @IsOptional()
  public readonly categories?: string[];

  @IsOptional()
  @IsArray()
  @IsString({ each: true })
  @Type(() => String)
  @Transform(({ value }) => value instanceof String ? value.split(',') : value)
  public readonly dentors?: string[];
}