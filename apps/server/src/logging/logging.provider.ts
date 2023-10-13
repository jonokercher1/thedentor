import { Logger } from '@nestjs/common';
import AxiomLogger from '@/logging/loggers/axiom-logger';
import { ILogger } from '@/logging/types/Logger';

const getLogger = (): ILogger => {
  const env = process.env.NODE_ENV;

  switch (env) {
    case 'test':
    case 'development':
    case 'local':
      return new Logger;

    default:
      return new AxiomLogger;
  }
};

export const ILoggingProvider = Symbol('ILoggingProvider');

export const LoggingProvider = {
  provide: ILoggingProvider,
  useValue: getLogger(),
};