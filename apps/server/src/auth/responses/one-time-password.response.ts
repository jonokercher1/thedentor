import HttpSuccessResponse from '@/common/responses/http-success.response';
import { Expose } from 'class-transformer';

interface IOneTimePasswordResponseData {
  createdAt: string;
}

class OneTimePasswordResponseData {
  @Expose()
  createdAt: string;

  constructor(data?: IOneTimePasswordResponseData) {
    Object.assign(this, data);
  }
}

export default class OneTimePasswordResponse extends HttpSuccessResponse<OneTimePasswordResponseData> {
  constructor(data?: IOneTimePasswordResponseData) {
    super(new OneTimePasswordResponseData(data));
  }
}