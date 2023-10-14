import BaseRepository from '@/common/repositories/base.repository';
import { PrismaService } from '@/database/prisma.service';
import { Injectable, Inject } from '@nestjs/common';
import { ISearchProvider } from '@/search/search.provider';
import { SearchClient } from '@/search/types/search-client';

@Injectable()
abstract class SearchableRepository extends BaseRepository {
  public abstract indexName: string;

  public abstract searchableFields: string[]

  constructor(
    protected readonly database: PrismaService,
    @Inject(ISearchProvider) protected readonly searchClient?: SearchClient,
  ) {
    super(database);
  }

  // TODO: investigate if we can make a method decorator for this? Not sure how you would access missing properties (e.g. objectID)
  public createSearchableObject(object: unknown) {
    const providedObjectKeys = Object.keys(object);
    const validObject = this.searchableFields.every(v => providedObjectKeys.includes(v));

    if (!validObject) {
      console.error('You must specify all searchable keys:', this.searchableFields);
    } else {
      return this.searchClient.createObject(this.indexName, this.searchableFields, object);
    }
  }

  // TODO: implement updatae, delete and search
  // public async updateSearchableObject(objectID: string, update: any) {}
  // public async deleteSearchableObject(objectID: string) {}
  // public async search(query: string, paginationInput: PaginationInput) {}
}

export default SearchableRepository;