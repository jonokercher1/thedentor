import { PaginationRequest } from '@/common/requests/pagination.request';
import { IsOptional, IsString } from 'class-validator';

export class CreateCoursePurchaseIntentRequest extends PaginationRequest {
  @IsOptional()
  @IsString()
  public readonly email?: string;
}