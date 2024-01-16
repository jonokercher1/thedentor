import HttpSuccessResponse, { HttpPaginatedResponse } from '@/common/responses/http-success.response';
import { CourseFeedbackQuestionType } from '@/database/types/course-feedback';
import { CourseFeedbackQuestion } from '@prisma/client';
import { Expose } from 'class-transformer';

type ICourseFeedbackQuestionData = Partial<CourseFeedbackQuestion>;

export class CourseFeedbackQuestionData {
  @Expose()
  public readonly id: string;

  @Expose()
  public readonly question: string;

  @Expose()
  public readonly type: CourseFeedbackQuestionType;

  @Expose()
  public readonly order: number;

  constructor(courseFeedbackQuestionData?: ICourseFeedbackQuestionData) {
    Object.assign(this, courseFeedbackQuestionData);
  }
}

export class CourseFeedbackQuestionResponse extends HttpSuccessResponse<CourseFeedbackQuestionData> {
  private static readonly transformerClass = CourseFeedbackQuestionData;

  constructor(data?: CourseFeedbackQuestionData) {
    super(new CourseFeedbackQuestionResponse.transformerClass(data));
  }

  // TOOD: work out how to make this generic
  public static paginate(data: ICourseFeedbackQuestionData[], total: number, page: number) {
    const dataResponse = data.map((item) => new CourseFeedbackQuestionResponse.transformerClass(item));

    return new HttpPaginatedResponse(dataResponse, total, page);
  }
}