import { Module } from '@nestjs/common';
import HttpSuccessResponse from './responses/http-success.response';

@Module({
  providers: [HttpSuccessResponse],
  exports: [],
  imports: []
})
export class CommonModule { }
