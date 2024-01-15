import { CreateUserRequest } from '@/user/requests/create-user.request';
import { Type } from 'class-transformer';
import { ValidateNested } from 'class-validator';

export class CreateUserCoursePurchaseRequest {
  @ValidateNested()
  @Type(() => CreateUserRequest)
  public readonly user: CreateUserRequest;
}