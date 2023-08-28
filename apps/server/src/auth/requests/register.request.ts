
import { IsEmail, IsNotEmpty, IsOptional, IsString, MinLength } from 'class-validator';
import { Match } from '@/auth/decorators/match-validator';

export class RegisterRequest {
  @IsEmail()
  public readonly email: string;

  @IsNotEmpty()
  public readonly name: string;

  // @Transform(value => value.toString())
  // @IsPhoneNumber()
  @IsOptional()
  public readonly phone: string;

  // TODO: add regex for GDC numbers
  @IsString()
  public readonly gdcNumber: string;

  @IsString()
  @MinLength(8)
  public readonly password: string;

  @Match('password')
  public readonly passwordConfirmation: string;
}