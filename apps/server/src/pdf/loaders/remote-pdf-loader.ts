// import { Inject } from '@nestjs/common';
// import { ILoggingProvider } from '@/logging/logging.provider';
// import { ILogger } from '@/logging/types/Logger';
import { PdfLoadError } from '@/pdf/errors/pdf-load-error';
import { PdfLoader } from '@/pdf/types/pdf-loader';

export class RemotePdfLoader implements PdfLoader {
  // constructor(
  //   @Inject(ILoggingProvider) private readonly logger: ILogger,
  // ) { }

  public async loadFromUrl(url: string): Promise<ArrayBuffer> {
    try {
      const response = await fetch(url);

      return response.arrayBuffer();
    } catch (e) {
      // TODO: get logging to work here
      console.log('🚀 ~ RemotePdfLoader ~ loadFromUrl ~ e:', e);
      // this.logger.error('RemotePdfLoader.load', `Error loading PDF from ${url}`, {
      //   error: e.message,
      //   stack: e.stack,
      // });

      throw new PdfLoadError(url);
    }
  }
}