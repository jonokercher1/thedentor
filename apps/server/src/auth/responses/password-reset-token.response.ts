import { Expose } from 'class-transformer';
import HttpSuccessResponse from '@/common/responses/http-success.response';
import { User } from '@/database/types/user';
import { PasswordResetToken } from '@/database/types/password-reset-token';

type IPasswordResetTokenData = Partial<PasswordResetToken> & Partial<User>;

class PasswordResetTokenUserData {
  @Expose()
  public readonly email: string;

  constructor(data?: Partial<User>) {
    Object.assign(this, data);
  }
}

class PasswordResetTokenResponseData {
  @Expose()
  public readonly token: string;

  @Expose()
  public readonly user: PasswordResetTokenUserData;

  @Expose()
  public readonly createdAt: string;

  @Expose()
  public readonly updatedAt: string;

  constructor(data?: IPasswordResetTokenData) {
    Object.assign(this, data);
  }
}

export class PasswordResetTokenResponse extends HttpSuccessResponse<PasswordResetTokenResponseData> {
  constructor(data?: IPasswordResetTokenData) {
    super(new PasswordResetTokenResponseData(data));
  }
}