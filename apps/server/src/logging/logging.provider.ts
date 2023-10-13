import { Logger } from '@nestjs/common';
import AxiomLogger from './loggers/axiom-logger';

const getLogger = () => {
  const env = process.env.NODE_ENV;

  switch (env) {
    case 'TEST':
    case 'DEVELOPMENT':
      return Logger;

    default:
      return AxiomLogger;
  }
};

export const ILoggingProvider = Symbol('ILoggingProvider');

export const LoggingProvider = {
  provide: ILoggingProvider,
  useClass: getLogger(),
};