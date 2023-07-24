import { Type } from 'class-transformer';
import { IsInt, IsNotEmpty, } from 'class-validator';

export class PaginationRequest {
  @IsNotEmpty()
  @IsInt()
  @Type(() => Number)
  public readonly pageSize: number;

  @IsNotEmpty()
  @IsInt()
  @Type(() => Number)
  public readonly page: number;
}