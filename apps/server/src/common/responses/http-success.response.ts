import { Expose } from 'class-transformer';

export default class HttpSuccessResponse<Data> {
  @Expose()
  public readonly message: string = 'success';

  @Expose()
  public readonly data: Data | Data[];

  @Expose()
  public readonly statusCode: number = 200;

  constructor(data?: Data | Data[], statusCode = 200) {
    this.data = data;
    this.statusCode = statusCode;
  }
}

export class HttpPaginatedResponse<Data> extends HttpSuccessResponse<Data> {
  @Expose()
  public readonly total: number;

  @Expose()
  public readonly page: number;

  constructor(data?: Data[], total?: number, page?: number) {
    super(data);
    this.total = total;
    this.page = page;
  }
}