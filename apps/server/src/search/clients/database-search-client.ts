import { ILoggingProvider } from '@/logging/logging.provider';
import { ILogger } from '@/logging/types/Logger';
import { SearchClient } from '@/search/types/search-client';
import { Inject } from '@nestjs/common';

export default class DatabaseSearchClient implements SearchClient {
  constructor(
    @Inject(ILoggingProvider)
    private readonly logger: ILogger,
  ) { }

  public createObject(name: string, searchableFields: string[], object: any) {
    this.logger.log('createObject', 'Called searchClient.createObject', 'No action to take');
  }

  public updateObject(name: string, searchableFields: string[], object: any) {
    this.logger.log('updateObject', 'Called searchClient.updateObject', 'No action to take');
  }

  public deleteObject(name: string, searchableFields: string[], object: any) {
    this.logger.log('deleteObject', 'Called searchClient.deleteObject', 'No action to take');
  }

  public async search(query: string) {
    // TODO: implement basic database like search
    this.logger.log('search', 'Called searchClient.search', 'No action to take');
    return [];
  }
}