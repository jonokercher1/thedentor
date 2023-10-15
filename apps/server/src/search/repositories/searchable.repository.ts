import BaseRepository from '@/common/repositories/base.repository';
import { PrismaService } from '@/database/prisma.service';
import { Injectable, Inject } from '@nestjs/common';
import { ISearchProvider } from '@/search/search.provider';
import { SearchClient, SearchObject } from '@/search/types/search-client';
import { PaginationInput } from '@/common/types/pagination';

@Injectable()
abstract class SearchableRepository extends BaseRepository {
  public abstract indexName: string;

  public abstract searchableFields: string[];

  public abstract search<Result>(query: string, paginationInput: PaginationInput): Promise<Result[]>

  constructor(
    protected readonly database: PrismaService,
    @Inject(ISearchProvider) protected readonly searchClient?: SearchClient,
  ) {
    super(database);
  }

  // TODO: Ideally this would be called here in the constructor
  // Need to workout how to access the properties of a child class without having to manually construct this class everytime we inherit
  public async initIndex() {
    this.searchClient.initIndex(this.indexName, this.searchableFields);
  }

  // TODO: investigate if we can make a method decorator for this? Not sure how you would access missing properties (e.g. objectID)
  public async createSearchableObject(object: SearchObject) {
    return this.searchClient.createObject(object);
  }

  public async updateSearchableObject(object: SearchObject) {
    return this.searchClient.updateObject(object);
  }

  public deleteSearchableObject(objectID: string) {
    return this.searchClient.deleteObject(objectID);
  }
}

export default SearchableRepository;