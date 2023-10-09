import { IsEmail } from 'class-validator';

export class RequestPasswordResetRequest {
  @IsEmail()
  public readonly email: string;
}