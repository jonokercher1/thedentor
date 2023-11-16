import { PaginationInput } from '@/common/types/pagination';
import { PrismaService } from '@/database/prisma.service';
import { ILoggingProvider } from '@/logging/logging.provider';
import { ILogger } from '@/logging/types/Logger';
import { SearchClient } from '@/search/types/search-client';
import { Inject } from '@nestjs/common';

export default class DatabaseSearchClient implements SearchClient {
  // This is the database entity object
  private index: any;

  constructor(
    @Inject(ILoggingProvider)
    private readonly logger: ILogger,
    private readonly database: PrismaService,
  ) { }

  public initIndex(indexName: string, searchableFields: string[]) {
    this.logger.log('initIndex', 'Initalising database entity', { indexName, searchableFields });

    // TODO: make this dynamic somehow
    return this.database.course;
  }

  public async createObject(object: any) {
    this.logger.log('createObject', 'Called searchClient.createObject', { object });
  }

  public async updateObject(object: any) {
    this.logger.log('updateObject', 'Called searchClient.updateObject', { object });
  }

  public async deleteObject(objectID: string) {
    this.logger.log('deleteObject', 'Called searchClient.deleteObject', { objectID });
  }

  // TODO: implement pagination for tests
  public async search(query: string, pagination: PaginationInput) {
    this.logger.log('search', 'Called searchClient.search');

    const entity = this.database[this.index] as any;
    const filters = {
      OR: [
        { name: { contains: query } },
        { description: { contains: query } },
      ],
    };

    // TODO: refactor to use dynamic index name in options
    const results = await entity.findMany({
      where: filters,
    });

    const count = await entity.count({
      where: filters,
    });

    return {
      results,
      count,
    };
  }
}