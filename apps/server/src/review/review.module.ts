import { Module } from '@nestjs/common';
import { ReviewRepository } from './repositories/review.repository';
import { DatabaseModule } from '@/database/database.module';

@Module({
  providers: [ReviewRepository],
  exports: [ReviewRepository],
  imports: [DatabaseModule],
})
export class ReviewModule { }
