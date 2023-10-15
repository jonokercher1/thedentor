import { Inject, Injectable } from '@nestjs/common';
import SearchableRepository from './searchable.repository';
import { PrismaService } from '@/database/prisma.service';
import { ISearchProvider } from '@/search/search.provider';
import { SearchClient } from '@/search/types/search-client';
import { PaginationInput } from '@/common/types/pagination';

// TODO: remove this - this is just to show how searching can be implemented for ANY entity in the database
@Injectable()
export class TestRepository extends SearchableRepository {
  public indexName = 'course';

  public searchableFields = ['name', 'description', 'dentorName'];

  private readonly entity = this.database.course;

  constructor(
    protected readonly database: PrismaService,
    @Inject(ISearchProvider) protected readonly searchClient?: SearchClient,
  ) {
    super(database);
    this.initIndex();
  }

  public async test() {
    await this.deleteSearchableObject('1234');
  }

  public search<Result>(query: string, paginationInput: PaginationInput): Promise<Result[]> {
    throw new Error('Method not implemented.');
  }
}