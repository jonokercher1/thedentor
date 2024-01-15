import { IsEmail, IsOptional, IsString } from 'class-validator';

export class CreateUserRequest {
  @IsEmail()
  public readonly email: string;

  @IsOptional()
  @IsString()
  public readonly name: string;

  // @Transform(value => value.toString())
  // @IsPhoneNumber()
  @IsString()
  @IsOptional()
  public readonly phone: string;
}