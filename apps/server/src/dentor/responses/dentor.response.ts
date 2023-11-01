import HttpSuccessResponse, { HttpPaginatedResponse } from '@/common/responses/http-success.response';
import { User } from '@/database/types/user';
import { Expose } from 'class-transformer';

type IDentorData = Partial<User>;

class DentorData {
  @Expose()
  public readonly id: string;

  @Expose()
  public readonly name: string;

  @Expose()
  public readonly gdcNumber: string;

  @Expose()
  public readonly rating: number;

  // TODO: add profile pictures

  constructor(dentorData?: IDentorData) {
    Object.assign(this, dentorData);
  }
}

export class DentorResponse extends HttpSuccessResponse<DentorData> {
  private static readonly transformerClass = DentorData;

  constructor(data?: DentorData) {
    super(new DentorResponse.transformerClass(data));
  }

  // TOOD: work out how to make this generic
  public static paginate(data: IDentorData[], total: number, page: number) {
    const dataResponse = data.map((item) => new DentorResponse.transformerClass(item));

    return new HttpPaginatedResponse(dataResponse, total, page);
  }
}