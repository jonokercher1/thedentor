import { File, Image } from '@prisma/client';
import { Expose } from 'class-transformer';
import HttpSuccessResponse from '../../common/responses/http-success.response';
import { FileResponse } from './file-response';

type IImageResponseData = Partial<Image> & { files: Partial<File[]> }

class ImageResponseData {
  @Expose()
  public readonly id: string;

  @Expose()
  public readonly files: FileResponse[];

  constructor(data?: IImageResponseData) {
    Object.assign(this, data);
    this.files = data.files.map(file => new FileResponse(file));
  }
}

export class ImageResponse extends HttpSuccessResponse<ImageResponseData> {
  constructor(data: IImageResponseData) {
    super(new ImageResponseData(data));
  }
}