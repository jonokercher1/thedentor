import { Module } from '@nestjs/common';
import { PdfGeneratorService } from '@/pdf/services/pdf-generator.service';
import { IPdfLoaderProvider, PdfLoaderProvider } from './pdf-loader.provider';

@Module({
  providers: [
    PdfGeneratorService,
    PdfLoaderProvider,
  ],
  exports: [PdfGeneratorService, IPdfLoaderProvider],
})
export class PdfModule { }
