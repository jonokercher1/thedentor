import { WinstonTransport as AxiomTransport } from '@axiomhq/winston';
import * as winston from 'winston';
import WinstonLogger from './winston-logger';
import { axiomConfig as config } from '@/logging/config/axiom';

export default class AxiomLogger extends WinstonLogger {
  public readonly logger = winston.createLogger({
    format: winston.format.json(),
    transports: [
      new AxiomTransport(config),
    ],
  });
}