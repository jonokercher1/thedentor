import HttpSuccessResponse from '@/common/responses/http-success.response';
import { Expose } from 'class-transformer';

type ICourseCheckoutData = { clientSecret: string }

class CourseCheckoutData {
  @Expose()
  public readonly clientSecret: string;

  constructor(courseCheckoutData?: ICourseCheckoutData) {
    Object.assign(this, courseCheckoutData);
  }
}

export class CourseCheckoutResponse extends HttpSuccessResponse<CourseCheckoutData> {
  private static readonly transformerClass = CourseCheckoutData;

  constructor(data?: ICourseCheckoutData) {
    super(new CourseCheckoutResponse.transformerClass(data));
  }
}