export class InvalidPdfPageError extends Error {
  constructor() {
    super('No page loaded');
  }
}