import { IsNumberOrString } from '@/common/decorators/is-number-or-string';
import { Type } from 'class-transformer';
import { IsArray, IsString, IsUUID, ValidateNested } from 'class-validator';

class CourseFeedbackQuestionAnswer {
  @IsString()
  @IsUUID()
  questionId: string;

  @IsNumberOrString()
  answer: string | number;
}

export class SubmitCourseFeedbackAnswersRequest {
  @ValidateNested({ each: true })
  @IsArray()
  @Type(() => CourseFeedbackQuestionAnswer)
  answers: CourseFeedbackQuestionAnswer[];
}