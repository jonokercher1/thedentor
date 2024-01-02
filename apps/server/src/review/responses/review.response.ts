import HttpSuccessResponse, { HttpPaginatedResponse } from '@/common/responses/http-success.response';
import { Review } from '@/database/types/review';
import { User } from '@/database/types/user';
import { DentorData } from '@/dentor/responses/dentor.response';
import { Expose, Type } from 'class-transformer';

type IReviewData = Partial<Review> & { dentor: Partial<User> };

export class ReviewData {
  @Expose()
  public readonly id: string;

  @Expose()
  public readonly title: string;

  @Expose()
  public readonly content: string;

  @Expose()
  public readonly rating: number;

  @Expose()
  @Type(() => DentorData)
  public readonly dentor: DentorData;

  constructor(reviewData?: IReviewData) {
    Object.assign(this, reviewData);
    this.dentor = new DentorData(reviewData.dentor);
  }
}

export class ReviewResponse extends HttpSuccessResponse<ReviewData> {
  private static readonly transformerClass = ReviewData;

  constructor(data?: ReviewData) {
    super(new ReviewResponse.transformerClass(data));
  }

  // TOOD: work out how to make this generic
  public static paginate(data: IReviewData[], total: number, page: number) {
    const dataResponse = data.map((item) => new ReviewResponse.transformerClass(item));

    return new HttpPaginatedResponse(dataResponse, total, page);
  }
}