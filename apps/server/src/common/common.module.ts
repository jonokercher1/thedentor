import { Module } from '@nestjs/common';
import HttpSuccessResponse from '@/common/responses/http-success.response';

@Module({
  providers: [HttpSuccessResponse],
  exports: [],
  imports: [],
})
export class CommonModule { }
