import { Module } from '@nestjs/common';
import { ILoggingProvider, LoggingProvider } from '@/logging/logging.provider';

@Module({
  providers: [LoggingProvider],
  exports: [ILoggingProvider],
})
export class LoggingModule { }
