/* eslint-disable @typescript-eslint/ban-types */
import { SearchClient } from '@/search/types/search-client';
import { Inject } from '@nestjs/common';
import { ISearchProvider } from '@/search/search.provider';

export const Searchable = (name: string, searchableFields: string[]) => {
  return (constructor: Function) => {
    const searchClient: SearchClient = Inject(ISearchProvider)(constructor, 'ISearchProvider') as any;
    console.log('🚀 ~ file: searchable.ts:9 ~ return ~ searchClient:', searchClient);

    constructor.prototype.createSearchableObject = (object: unknown) => {
      const providedObjectKeys = Object.keys(object);
      const validObject = searchableFields.every(v => providedObjectKeys.includes(v));

      if (!validObject) {
        console.error('You must specify all searchable keys:', searchableFields);
      } else {
        return searchClient.createObject(name, searchableFields, object);
      }
    };
  };
};