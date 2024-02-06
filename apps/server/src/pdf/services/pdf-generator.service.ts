import { PDFDocument, PDFPage } from 'pdf-lib';
import { InvalidPdfPageError } from '@/pdf/errors/invalid-pdf-page-error';
import { InvalidPdfDocumentError } from '@/pdf/errors/invalid-pdf-document-error';

export class PdfGeneratorService {
  private readonly client: typeof PDFDocument;

  private _document: PDFDocument;

  private _currentPage: PDFPage;

  constructor() {
    this.client = PDFDocument;
  }

  public async load(buffer: ArrayBuffer | string | Uint8Array): Promise<PdfGeneratorService> {
    this.document = await this.client.load(buffer);

    return this;
  }

  public loadPage(page: number): PdfGeneratorService {
    if (!this.document) {
      throw new InvalidPdfDocumentError();
    }

    this.currentPage = this.document.getPage(page);

    return this;
  }

  public addText(text: string | number, x: number, y: number, size?: number): PdfGeneratorService {
    if (!this.currentPage) {
      throw new InvalidPdfPageError();
    }

    this.currentPage.drawText(text.toString(), { x, y, size });

    return this;
  }

  public async save(): Promise<Uint8Array> {
    return this.document.save();
  }

  public set document(document: PDFDocument) {
    this._document = document;
  }

  public get document(): PDFDocument {
    return this._document;
  }

  public set currentPage(currentPage: PDFPage) {
    this._currentPage = currentPage;
  }

  public get currentPage(): PDFPage {
    return this._currentPage;
  }
}