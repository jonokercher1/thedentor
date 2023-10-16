export default class DuplicateEntityError extends Error {
  constructor(entity: string, description?: string) {
    const message = `${entity} already exists. ${description}`;
    super(message);
  }
}