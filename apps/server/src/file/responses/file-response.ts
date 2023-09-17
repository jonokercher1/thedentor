import { FileSize, File } from '@prisma/client';
import { Expose } from 'class-transformer';
import HttpSuccessResponse from '../../common/responses/http-success.response';

type IFileResponseData = Partial<File>

class FileResponseData {
  @Expose()
  public readonly id: string;

  @Expose()
  public readonly size: FileSize;

  @Expose()
  public readonly name: string;

  @Expose()
  public readonly mime: string;

  constructor(data?: IFileResponseData) {
    Object.assign(this, data);
  }
}

export class FileResponse extends HttpSuccessResponse<FileResponseData> {
  constructor(data: IFileResponseData) {
    super(new FileResponseData(data));
  }
}