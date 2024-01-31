import { Injectable, Inject } from '@nestjs/common';
import { ILoggingProvider } from '@/logging/logging.provider';
import { ILogger } from '@/logging/types/Logger';
import { PdfLoadError } from '@/pdf/errors/pdf-load-error';

@Injectable()
export class PdfLoaderService {
  constructor(
    @Inject(ILoggingProvider) private readonly logger: ILogger,
  ) { }

  public async loadFromRemoteUrl(url: string): Promise<ArrayBuffer> {
    try {
      const response = await fetch(url);

      return response.arrayBuffer();
    } catch (e) {
      this.logger.error('PdfLoaderService.load', `Error loading PDF from ${url}`, {
        error: e.message,
        stack: e.stack,
      });

      throw new PdfLoadError(url);
    }
  }
}