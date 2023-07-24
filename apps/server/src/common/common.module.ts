import { Module } from '@nestjs/common';
import HttpSuccessResponse from './responses/HttpSuccessResponse';

@Module({
  providers: [HttpSuccessResponse],
  exports: [],
  imports: []
})
export class CommonModule { }
