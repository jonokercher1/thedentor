
export default class EntityNotFound extends Error {
  constructor(entity: string, description?: string) {
    const message = `${entity} not found. ${description}`;
    super(message);
  }
}