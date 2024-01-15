import { Expose } from 'class-transformer';
import HttpSuccessResponse from '@/common/responses/http-success.response';
import { User } from '@/database/types/user';

type IPublicUserResponseData = Partial<User>;

class PublicUserResponseData {
  @Expose()
  public readonly email: string;

  @Expose()
  public readonly name?: string;

  @Expose()
  public readonly phone?: string;

  constructor(data?: IPublicUserResponseData) {
    Object.assign(this, data);
  }
}

export class PublicUserResponse extends HttpSuccessResponse<PublicUserResponseData> {
  constructor(data?: IPublicUserResponseData) {
    super(new PublicUserResponseData(data));
  }
}