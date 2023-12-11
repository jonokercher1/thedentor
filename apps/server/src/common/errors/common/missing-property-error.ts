
export default class MissingPropertyError extends Error {
  constructor(context: string, missingProperties: string[]) {
    const message = `${context} is missing properties: ${missingProperties.join(', ')}`;
    super(message);
  }
}