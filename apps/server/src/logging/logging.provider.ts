import { Logger } from '@nestjs/common';
import AxiomLogger from '@/logging/loggers/axiom-logger';
import { ILogger } from '@/logging/types/Logger';

const getLogger = (): ILogger => {
  const logger = process.env.LOGGER ?? 'console';

  switch (logger) {
    case 'axiom':
      return new AxiomLogger;

    case 'console':
    default:
      return new Logger;
  }
};

export const ILoggingProvider = Symbol('ILoggingProvider');

export const LoggingProvider = {
  provide: ILoggingProvider,
  useValue: getLogger(),
};