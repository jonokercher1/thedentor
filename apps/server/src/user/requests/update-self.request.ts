import { IsEmail, IsOptional, IsString } from 'class-validator';

export class UpdateSelfRequest {
  @IsEmail()
  @IsOptional()
  public readonly email: string;

  @IsOptional()
  @IsString()
  public readonly name: string;

  // @Transform(value => value.toString())
  // @IsPhoneNumber()
  @IsString()
  @IsOptional()
  public readonly phone: string;

  // TODO: add regex for GDC numbers
  // @IsValidGDCNumber()
  @IsString()
  @IsOptional()
  public readonly gdcNumber: string;
}