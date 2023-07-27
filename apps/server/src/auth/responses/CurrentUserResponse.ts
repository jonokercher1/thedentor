import { User } from '@prisma/client';
import { Expose } from 'class-transformer';
import HttpSuccessResponse from '../../common/responses/HttpSuccessResponse';

type ICurrentUserResponseData = Partial<User> & { accessToken: string };

class CurrentUserResponseData {
  @Expose()
  public readonly id: string;

  @Expose()
  public readonly email: string;

  @Expose()
  public readonly name: string;

  @Expose()
  public readonly phone: string;

  @Expose()
  public readonly gdcNumber: string;

  @Expose()
  public readonly role: string;

  @Expose()
  public readonly accessToken: string;

  constructor(data?: ICurrentUserResponseData) {
    Object.assign(this, data);
    this.role = data.roleName;
  }
}

export class CurrentUserResponse extends HttpSuccessResponse<CurrentUserResponseData> {
  constructor(data?: ICurrentUserResponseData) {
    super(new CurrentUserResponseData(data));
  }
}