import { IsEmail, IsNotEmpty } from 'class-validator';

export class OneTimePasswordLoginRequest {
  @IsEmail()
  public readonly email: string;

  @IsNotEmpty()
  public readonly oneTimePassword: string;
}