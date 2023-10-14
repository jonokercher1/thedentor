import { Injectable } from '@nestjs/common';
import SearchableRepository from './searchable.repository';

// TODO: remove this - this is just to show how searching can be implemented for ANY entity in the database
@Injectable()
export class TestRepository extends SearchableRepository {
  public indexName = 'course';

  public searchableFields = ['name', 'description', 'dentorName'];

  private readonly entity = this.database.course;

  public async test() {
    this.createSearchableObject({
      objectID: '1234',
      name: 'test',
      description: 'new description',
      dentorName: 'Jono Kercher',
    });
  }
}