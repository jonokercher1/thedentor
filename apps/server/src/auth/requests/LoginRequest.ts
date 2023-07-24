import { IsEmail, IsString, MinLength } from 'class-validator';

export class LoginRequest {
  @IsEmail()
  public readonly email: string;

  @IsString()
  @MinLength(8)
  public readonly password: string;
}