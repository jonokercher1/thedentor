
export default class InvalidEmailAndOneTimePasswordCombinationError extends Error {
  constructor() {
    super('Invalid email and one time password combination');
  }
}