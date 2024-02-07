import { Type } from 'class-transformer';
import { IsEnum, IsInt, IsOptional, IsString } from 'class-validator';

export enum Order {
  Asc = 'asc',
  Desc = 'desc'
}

export class PaginationRequest {
  @IsOptional()
  @IsInt()
  @Type(() => Number)
  public readonly perPage?: number;

  @IsOptional()
  @IsInt()
  @Type(() => Number)
  public readonly page?: number;

  @IsOptional()
  @IsString()
  public readonly orderBy?: string;

  @IsOptional()
  @IsEnum(Order)
  public readonly order?: 'asc' | 'desc';
}