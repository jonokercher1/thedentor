export interface PaginationInput {
  page: number
  perPage: number
  order?: 'asc' | 'desc'
  orderBy?: string
}