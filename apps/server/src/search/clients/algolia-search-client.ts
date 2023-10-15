import { SearchClient, SearchObject } from '@/search/types/search-client';
import algoliasearch, { SearchClient as IAlgolioaSearchClient, SearchIndex } from 'algoliasearch';
import { algoliaConfig } from '@/search/config/algolia.config';
import { Inject, Injectable } from '@nestjs/common';
import { ILoggingProvider } from '@/logging/logging.provider';
import { ILogger } from '@/logging/types/Logger';

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
  public async search<Result>(query: string): Promise<Result[]> {
    // TODO: implement this
    // https://www.algolia.com/doc/api-reference/api-methods/search/#examples
    return [];
  }

  public initIndex(indexName: string, searchableFields: string[]): void {
    const index = this.client.initIndex(indexName);
    index.setSettings({
      searchableAttributes: searchableFields,
    });

    this.index = index;
  }
}