import HttpSuccessResponse from '@/common/responses/http-success.response';
import { Expose } from 'class-transformer';

export interface CheckoutCustomerData {
  email: string
}

type ICourseCheckoutSessionStatus = { status: string }

class CourseCheckoutSessionStatusCustomer {
  @Expose()
  public readonly email: string;

  constructor(courseCheckoutCustomer?: CheckoutCustomerData) {
    Object.assign(this, courseCheckoutCustomer);
  }
}

class CourseCheckoutSessionStatus {
  @Expose()
  public readonly status: 'complete' | 'expired' | 'open';

  @Expose()
  public readonly customer: CourseCheckoutSessionStatusCustomer;

  constructor(courseCheckoutSessionStatus?: ICourseCheckoutSessionStatus) {
    Object.assign(this, courseCheckoutSessionStatus);
  }
}

export class CourseCheckoutSessionStatusResponse extends HttpSuccessResponse<CourseCheckoutSessionStatus> {
  private static readonly transformerClass = CourseCheckoutSessionStatus;

  constructor(data?: ICourseCheckoutSessionStatus) {
    super(new CourseCheckoutSessionStatusResponse.transformerClass(data));
  }
}