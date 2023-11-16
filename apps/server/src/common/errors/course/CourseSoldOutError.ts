export default class CourseSoldOutError extends Error {
  constructor() {
    super('Course is sold out');
  }
}