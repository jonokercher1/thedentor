
export default class InvalidApiKeyError extends Error {
  constructor() {
    super('Invalid API key');
  }
}