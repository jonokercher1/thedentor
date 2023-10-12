import { IsString, MinLength } from 'class-validator';
import { Match } from '@/common/decorators/match-validator';

export class ResetPasswordRequest {
  @IsString()
  public readonly token: string;

  @IsString()
  @MinLength(8)
  public readonly password: string;

  @Match('password')
  public readonly passwordConfirmation: string;
}