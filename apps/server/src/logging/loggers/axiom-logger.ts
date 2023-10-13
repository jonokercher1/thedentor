import { LoggerService } from '@nestjs/common';

export default class AxiomLogger implements LoggerService {
  public log(message: any, ...optionalParams: any[]) {
    console.log('logging log level', message, ...optionalParams);
  }

  public error(message: any, ...optionalParams: any[]) {
    console.error('logging error level', message, ...optionalParams);
  }

  public warn(message: any, ...optionalParams: any[]) {
    console.warn('logging warn level', message, ...optionalParams);
  }

  public debug(message: any, ...optionalParams: any[]) {
    console.log('logging debug level', message, ...optionalParams);
  }
}