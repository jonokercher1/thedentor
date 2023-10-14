import { Module } from '@nestjs/common';
import { SearchController } from '@/search/search.controller';
import { SearchService } from '@/search/services/search.service';
import { ISearchProvider, SearchProvider } from '@/search/search.provider';
import { TestRepository } from '@/search/repositories/test.repository';
import { DatabaseModule } from '@/database/database.module';

@Module({
  controllers: [SearchController],
  imports: [DatabaseModule],
  exports: [ISearchProvider],
  providers: [
    SearchProvider,
    SearchService,
    TestRepository,
  ],
})
export class SearchModule { }
