import { Global, Module } from '@nestjs/common';
import { ILoggingProvider, LoggingProvider } from '@/logging/logging.provider';

@Global()
@Module({
  providers: [LoggingProvider],
  exports: [ILoggingProvider],
})
export class LoggingModule { }
