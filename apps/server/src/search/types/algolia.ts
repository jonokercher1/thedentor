interface AlgoliaObject {
  objectID: string;
}

export interface AlgoliaCourse extends AlgoliaObject {
  name: string;
  description: string;
  dentorName: string;
}