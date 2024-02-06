
export interface PdfLoader {
  loadFromUrl: (url: string) => Promise<ArrayBuffer>
}