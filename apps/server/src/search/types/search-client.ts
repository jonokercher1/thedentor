import { PaginationInput } from '@/common/types/pagination';

export interface SearchOptions {
  index?: string;
}

export interface SearchObject {
  objectID: string
  [key: string]: string | number | JSON
}

export interface SearchClient {
  initIndex: (indexName: string, searchableFields: string[]) => void
  createObject: (object: SearchObject) => Promise<any>;
  updateObject: (object: SearchObject) => Promise<any>;
  deleteObject: (objectID: string) => Promise<any>;
  search: <Result>(query: string, pagination?: PaginationInput) => Promise<Result[]>;
}