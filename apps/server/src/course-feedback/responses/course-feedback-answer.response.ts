import HttpSuccessResponse from '@/common/responses/http-success.response';
import { CourseFeedbackResponse } from '@/database/types/course-feedback';
import { Expose, Type } from 'class-transformer';

type ICourseFeedbackAnswerData = Partial<CourseFeedbackResponse>;
type ICourseFeedbackAnswerDataAnswers = Partial<CourseFeedbackResponse['answers']>;

class CourseFeeedbackAnswerAnswers {
  @Expose()
  public readonly questionId: string;

  @Expose()
  public readonly question: string;

  @Expose()
  public readonly answer: string | number;

  constructor(courseFeedbackAnswerData?: ICourseFeedbackAnswerDataAnswers) {
    Object.assign(this, courseFeedbackAnswerData);
  }
}

export class CourseFeedbackAnswerData {
  @Expose()
  public readonly id: string;

  @Expose()
  public readonly courseId: string;

  @Expose()
  @Type(() => CourseFeeedbackAnswerAnswers)
  public readonly answers: CourseFeeedbackAnswerAnswers[];

  constructor(courseFeedbackQuestionData?: ICourseFeedbackAnswerData) {
    Object.assign(this, courseFeedbackQuestionData);
  }
}

export class CourseFeedbackAnswerResponse extends HttpSuccessResponse<CourseFeedbackAnswerData> {
  private static readonly transformerClass = CourseFeedbackAnswerData;

  constructor(data?: ICourseFeedbackAnswerData) {
    super(new CourseFeedbackAnswerResponse.transformerClass(data));
  }
}