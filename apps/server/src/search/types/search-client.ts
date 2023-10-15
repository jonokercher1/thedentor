export interface SearchOptions {
  index?: string;
}

export interface SearchObject {
  objectID: string
  [key: string]: string | number | JSON
}

export interface SearchClient {
  initIndex: (indexName: string, searchableFields: string[]) => void
  createObject: (object: SearchObject) => void;
  updateObject: (object: SearchObject) => void;
  deleteObject: (objectID: string) => void;
  search: <Result>(query: string, options?: SearchOptions) => Promise<Result[]>;
}