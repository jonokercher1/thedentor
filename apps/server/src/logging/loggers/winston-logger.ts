import { Logger } from 'winston';
import { ILogger } from '../types/Logger';

export interface OptionalParams {
  [key: string]: any
}

export default abstract class WinstonLogger implements ILogger {
  abstract readonly logger: Logger;

  public log(functionName: string, message: any, originalErrorMessage: string, ...optionalParams: any[]) {
    this.constructLogMessage('info', functionName, message, originalErrorMessage, optionalParams);
  }

  public error(functionName: string, message: any, originalErrorMessage: string, ...optionalParams: any[]) {
    this.constructLogMessage('error', functionName, message, originalErrorMessage, optionalParams);
  }

  public warn(functionName: string, message: any, originalErrorMessage: string, ...optionalParams: any[]) {
    this.constructLogMessage('warn', functionName, message, originalErrorMessage, optionalParams);
  }

  public debug(functionName: string, message: any, originalErrorMessage: string, ...optionalParams: any[]) {
    this.constructLogMessage('debug', functionName, message, originalErrorMessage, optionalParams);
  }

  private constructLogMessage(
    level: 'info' | 'debug' | 'warn' | 'error',
    functionName: string,
    message: string,
    originalErrorMessage: string,
    ...optionalParams: OptionalParams[]
  ) {
    this.logger.log(level, message, {
      originalError: originalErrorMessage,
      function: functionName,
      details: optionalParams,
    });
  }
}