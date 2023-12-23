export default class AlreadyHasOneTimePasswordError extends Error {
  constructor() {
    super('There is already a one time password active');
  }
}