import { Logger } from 'winston';
import { ILogger } from '@/logging/types/Logger';

export interface OptionalParams {
  [key: string]: any
}

export default abstract class WinstonLogger implements ILogger {
  abstract readonly logger: Logger;

  public log(functionName: string, message: any, description: string, ...optionalParams: any[]) {
    this.constructLogMessage('info', functionName, message, description, optionalParams);
  }

  public error(functionName: string, message: any, description: string, ...optionalParams: any[]) {
    this.constructLogMessage('error', functionName, message, description, optionalParams);
  }

  public warn(functionName: string, message: any, description: string, ...optionalParams: any[]) {
    this.constructLogMessage('warn', functionName, message, description, optionalParams);
  }

  public debug(functionName: string, message: any, description: string, ...optionalParams: any[]) {
    this.constructLogMessage('debug', functionName, message, description, optionalParams);
  }

  private constructLogMessage(
    level: 'info' | 'debug' | 'warn' | 'error',
    functionName: string,
    message: string,
    description: string,
    ...optionalParams: OptionalParams[]
  ) {
    this.logger.log(level, message, {
      description,
      function: functionName,
      details: optionalParams,
    });
  }
}