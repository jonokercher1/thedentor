import { Module } from '@nestjs/common';
import { PdfGeneratorService } from '@/pdf/services/pdf-generator.service';
import { PdfLoaderService } from '@/pdf/services/pdf-loader.service';

@Module({
  providers: [PdfGeneratorService, PdfLoaderService],
  exports: [PdfGeneratorService, PdfLoaderService],
})
export class PdfModule { }
