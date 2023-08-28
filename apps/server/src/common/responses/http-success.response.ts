import { Expose } from 'class-transformer';

export default class HttpSuccessResponse<Data> {
  @Expose()
  public readonly success: boolean = true;

  @Expose()
  public readonly data: Data | Data[];

  constructor(data?: Data | Data[]) {
    this.data = data;
  }
}

export class HttpPaginatedResponse<Data> extends HttpSuccessResponse<Data> {
  @Expose()
  public readonly total: number;

  @Expose()
  public readonly page: number;

  constructor(data?: Data[], total?: number) {
    super(data);
    this.total = total;
  }
}