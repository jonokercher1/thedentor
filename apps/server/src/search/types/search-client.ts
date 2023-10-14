export interface SearchClient {
  createObject: (name: string, searchableFields: string[], object: any) => void
  updateObject: any
  deleteObject: any
  search: (query: string) => Promise<any[]>
}