import { IsEmail } from 'class-validator';

export class GetOneTimePasswordRequest {
  @IsEmail()
  public readonly email: string;
}