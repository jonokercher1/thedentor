
export class InvalidFeedbackQuestionError extends Error {
  constructor(questionId: string) {
    super(`Question ${questionId} is not a valid feedback question`);
  }
}