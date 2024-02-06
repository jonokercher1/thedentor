
export class MissingCourseFeedbackError extends Error {
  constructor(courseId: string, userId: string) {
    super(`User ${userId} has not submitted feedback for course ${courseId}`);
  }
}