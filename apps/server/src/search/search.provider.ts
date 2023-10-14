import AlgoliaSearchClient from '@/search/clients/algolia-search-client';
import DatabaseSearchClient from '@/search/clients/database-search-client';

const getSearchClient = () => {
  const client = process.env.SEARCH_CLIENT ?? 'database';

  switch (client) {
    case 'algolia':
      return AlgoliaSearchClient;

    default:
      return DatabaseSearchClient;
  }
};

export const ISearchProvider = Symbol('ISearchProvider');

export const SearchProvider = {
  provide: ISearchProvider,
  useClass: getSearchClient(),
};