export default class InvalidHashError extends Error {
  constructor() {
    super('Hashes don\'t match');
  }
}