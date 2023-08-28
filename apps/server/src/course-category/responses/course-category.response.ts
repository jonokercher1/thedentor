import { Category } from '@prisma/client';
import { Expose } from 'class-transformer';
import HttpSuccessResponse from '../../common/responses/http-success.response';

type ICourseCategoryData = Partial<Category>;

class CourseCategoryResponseData {
  @Expose()
  public readonly slug: string;

  @Expose()
  public readonly label: string;

  constructor(data?: ICourseCategoryData) {
    Object.assign(this, data);
  }
}

export class CourseCategoryResponse extends HttpSuccessResponse<CourseCategoryResponseData> {
  constructor(data?: ICourseCategoryData[]) {
    const formattedData = data.map(category => new CourseCategoryResponseData(category));
    super(formattedData);
  }
}