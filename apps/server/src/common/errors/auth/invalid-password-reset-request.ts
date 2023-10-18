export default class InvalidPasswordResetRequest extends Error {
  constructor(details?: string) {
    const message = `Passsword reset request invalid. ${details}`;
    super(message);
  }
}