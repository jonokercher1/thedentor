export default class CourseAlreadyPurchasedError extends Error {
  constructor() {
    super('Course is already owned');
  }
}