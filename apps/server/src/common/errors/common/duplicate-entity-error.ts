export default class DuplicateEntityError extends Error {
  constructor(entity: string, description?: string) {
    let message = `${entity} already exists`;

    if (description) {
      message = `${message}. ${description}`;
    }

    super(message);
  }
}