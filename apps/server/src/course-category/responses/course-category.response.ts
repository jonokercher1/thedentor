import { Expose } from 'class-transformer';
import HttpSuccessResponse from '../../common/responses/http-success.response';
import { Category } from '@/database/types/category';

export type ICourseCategoryData = Partial<Category>;

export class CourseCategoryResponseData {
  @Expose()
  public readonly slug: string;

  @Expose()
  public readonly label: string;

  constructor(data?: ICourseCategoryData) {
    Object.assign(this, data);
  }
}

// TODO: this should support a single course category and a paginated list too
export class CourseCategoryResponse extends HttpSuccessResponse<CourseCategoryResponseData> {
  constructor(data?: ICourseCategoryData[]) {
    const formattedData = data.map(category => new CourseCategoryResponseData(category));
    super(formattedData);
  }
}