export class InvalidPdfDocumentError extends Error {
  constructor() {
    super('No document loaded');
  }
}