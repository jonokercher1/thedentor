import { Type } from 'class-transformer';
import { IsArray, IsString, IsUUID, ValidateNested } from 'class-validator';

class CourseFeedbackQuestionAnswer {
  @IsString()
  @IsUUID()
  questionId: string;

  @IsString()
  answer: string;
}

export class SubmitCourseFeedbackAnswersRequest {
  @ValidateNested({ each: true })
  @IsArray()
  @Type(() => CourseFeedbackQuestionAnswer)
  answers: CourseFeedbackQuestionAnswer[];
}