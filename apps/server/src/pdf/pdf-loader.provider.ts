import { LocalPdfLoader } from './loaders/local-pdf-loader';
import { RemotePdfLoader } from './loaders/remote-pdf-loader';
import { PdfLoader } from '@/pdf/types/pdf-loader';

const getPdfLoader = (): PdfLoader => {
  const logger = process.env.PDF_LOADER ?? 'local';

  switch (logger) {
    case 'remote':
      return new RemotePdfLoader();

    case 'local':
    default:
      return new LocalPdfLoader();
  }
};

export const IPdfLoaderProvider = Symbol('IPdfLoaderProvider');

export const PdfLoaderProvider = {
  provide: IPdfLoaderProvider,
  useValue: getPdfLoader(),
};