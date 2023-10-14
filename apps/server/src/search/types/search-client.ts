export interface SearchClient {
  createObject: (name: string, searchableFields: string[], object: any) => void
  updateObject: any
  deleteObject: any
  search: (query: string) => Promise<any[]>
}

// createEntity -> algolia.initIndex
// getEntity 
// createObject -> algolia.index.saveObject



// @Searchable(
//   'course',
//   ['name', 'description', 'category', 'dentorName'],
// )
// class CoursesRepository {

// }