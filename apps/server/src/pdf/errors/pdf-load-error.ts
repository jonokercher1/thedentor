
export class PdfLoadError extends Error {
  constructor(url: string) {
    super(`Failed to load PDF from ${url}`);
  }
}