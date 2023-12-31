import { SearchClient, SearchObject } from '@/search/types/search-client';
import algoliasearch, { SearchClient as IAlgolioaSearchClient, SearchIndex } from 'algoliasearch';
import { algoliaConfig } from '@/search/config/algolia.config';
import { Inject, Injectable } from '@nestjs/common';
import { ILoggingProvider } from '@/logging/logging.provider';
import { ILogger } from '@/logging/types/Logger';
import { PaginationInput } from '@/common/types/pagination';

@Injectable()
export default class AlgoliaSearchClient implements SearchClient {
  private readonly client: IAlgolioaSearchClient;

  private index: SearchIndex;

  constructor(
    @Inject(ILoggingProvider)
    private readonly logger: ILogger,
  ) {
    this.client = algoliasearch(algoliaConfig.appId, algoliaConfig.apiKey);
  }

  public async createObject(object: SearchObject) {
    this.logger.log('AlgoliaSearchClient.createObject', 'Creating object in Algolia', { object });

    // If you see issues with this failing but no error messages, we may need to add a .wait() onto this
    return this.index.saveObject(
      object,
      {
        autoGenerateObjectIDIfNotExist: false,
      },
    );
  }

  public async updateObject(object: SearchObject) {
    this.logger.log('AlgoliaSearchClient.updateObject', 'Updating object in Algolia', { object });

    // If you see issues with this failing to update but no error messages, we may need to add a .wait() onto this
    return this.index.partialUpdateObject(object);
  }

  public async deleteObject(objectID: string) {
    this.logger.log('AlgoliaSearchClient.deleteObject', 'Deleting object in Algolia', { objectID });

    // If you see issues with this failing to update but no error messages, we may need to add a .wait() onto this
    return this.index.deleteObject(objectID);
  }

  // TODO: this will need a pagination input - it should be in the same format as we use internally
  public async search<Result>(query: string, pagination: PaginationInput, filters?: string): Promise<{ results: Result[], count: number }> {
    this.logger.log('AlgoliaSearchClient.search', 'Searching in Algolia', { query, pagination });

    // TODO: implement sorting for algolia search results
    // https://www.algolia.com/doc/guides/managing-results/refine-results/sorting/#sorting-by-attribute
    const { hits, nbHits } = await this.index.search<Result>(query, {
      page: pagination.page - 1, // ALGOLIA STARTS AT PAGE 0 FOR SOME UNKNOWN REASON
      hitsPerPage: pagination.perPage,
      filters,
    });

    this.logger.log('AlgoliaSearchClient.search', 'Searched in algolia', { resultCount: hits.length });

    return {
      results: hits,
      count: nbHits,
    };
  }

  public initIndex(indexName: string, searchableFields: string[]): void {
    const index = this.client.initIndex(indexName);
    index.setSettings({
      searchableAttributes: searchableFields,
    });

    this.index = index;
  }
}