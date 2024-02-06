// import { ILoggingProvider } from '@/logging/logging.provider';
// import { ILogger } from '@/logging/types/Logger';
// import { Inject } from '@nestjs/common';
import { PdfLoadError } from '@/pdf/errors/pdf-load-error';
import { promises as fs } from 'fs';
import { PdfLoader } from '@/pdf/types/pdf-loader';
import { join } from 'path';

export class LocalPdfLoader implements PdfLoader {
  // constructor(
  //   @Inject(ILoggingProvider) private readonly logger: ILogger,
  // ) { }

  public async loadFromUrl(url: string): Promise<ArrayBuffer> {
    try {
      // TODO: extract this to a reusable file loader
      const path = join(__dirname, '..', '..', '..', 'public', url);

      const response = await fs.readFile(path);

      return response;
    } catch (e) {
      // TODO: get logging to work here
      console.log('🚀 ~ LocalPdfLoader ~ loadFromUrl ~ e:', e);
      // this.logger.error('LocalPdfLoader.load', `Error loading PDF from ${url}`, {
      //   error: e.message,
      //   stack: e.stack,
      // });

      throw new PdfLoadError(url);
    }
  }
}