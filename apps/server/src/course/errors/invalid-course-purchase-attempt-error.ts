
export class InvalidCoursePurchaseAttemptError extends Error {
  constructor(reason?: string) {
    const message = reason ? `Invalid course purchase attempt: ${reason}` : 'Invalid course purchase attempt';

    super(message);
  }
}