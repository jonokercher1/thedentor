
export enum CourseFeedbackQuestionType {
  Rating = 'Rating',
  Text = 'Text',
  YesNo = 'YesNo'
}

export interface CourseFeedbackQuestion {
  id: string;
  question: string;
  type: CourseFeedbackQuestionType;
  order: number;
}

export interface CourseFeedbackResponse {
  id: string;
  answers: CourseFeedbackAnswer[];
}

export interface CourseFeedbackAnswer {
  questionId: string;
  question: string;
  answer: string | number;
}