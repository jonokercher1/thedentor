import { SearchClient } from '@/search/types/search-client';
import algoliasearch, { SearchClient as IAlgolioaSearchClient } from 'algoliasearch';
import { algoliaConfig } from '@/search/config/algolia.config';

export default class AlgoliaSearchClient implements SearchClient {
  private readonly client: IAlgolioaSearchClient;

  constructor() {
    this.client = algoliasearch(algoliaConfig.appId, algoliaConfig.apiKey);
  }

  public async createObject(indexName: string, searchableFields: string[], object: any) {
    const index = this.client.initIndex(indexName);
    index.setSettings({
      searchableAttributes: searchableFields,
    });

    await index.saveObject(object, {
      autoGenerateObjectIDIfNotExist: false,
    });
  }

  public async updateObject(indexName: string, searchableFields: string[], object: any) {
    // TODO: implement this
    // https://www.algolia.com/doc/api-reference/api-methods/partial-update-objects/#examples
  }

  public async deleteObject(indexName: string, searchableFields: string[], object: any) {
    // TODO: implement this
    // https://www.algolia.com/doc/api-reference/api-methods/delete-objects/
  }

  // TODO: this will need a pagination input - it should be in the same format as we use internally
  public async search(query: string) {
    // TODO: implement this
    // https://www.algolia.com/doc/api-reference/api-methods/search/#examples
    return [];
  }
}