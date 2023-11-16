import { Type } from 'class-transformer';
import { IsOptional, IsInt } from 'class-validator';

export class GetUpcomingCoursesRequest {
  @IsOptional()
  @IsInt()
  @Type(() => Number)
  public readonly perPage: number;

  @IsOptional()
  @IsInt()
  @Type(() => Number)
  public readonly page: number;
}