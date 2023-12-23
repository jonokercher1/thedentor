import { Expose } from 'class-transformer';
import HttpSuccessResponse from '@/common/responses/http-success.response';
import { User } from '@/database/types/user';

type ICurrentUserResponseData = Partial<User>;

class CurrentUserResponseData {
  @Expose()
  public readonly id: string;

  @Expose()
  public readonly email: string;

  @Expose()
  public readonly name?: string;

  @Expose()
  public readonly phone?: string;

  @Expose()
  public readonly gdcNumber?: string;

  @Expose()
  public readonly role: string;

  @Expose({ name: 'onboardingState' })
  public get onboardingState() {
    if (!this.email) {
      return 'not-started';
    }

    const requiredProfileFields = [this.gdcNumber, this.name, this.phone];
    const requiredProfileFieldsWithValues = requiredProfileFields.filter(v => !!v && v !== undefined && v !== null);

    if (requiredProfileFields.length === requiredProfileFieldsWithValues.length) {
      return 'complete';
    }

    return 'incomplete';
  }

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