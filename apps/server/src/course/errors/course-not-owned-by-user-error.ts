export class CourseNotOwnedByUserError extends Error {
  constructor(courseId: string, userId: string) {
    super(`Course ${courseId} is not owned by user ${userId}`);
  }
}