
export class InvalidCourseFeedbackSubmissionError extends Error {
  constructor(userId: string, courseId: string) {
    super(`User ${userId} cannot submit feedback for course ${courseId}`);
  }
}