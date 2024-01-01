'server-only'

import { HttpSuccessPaginatedResponse } from "@/types/api/http-success-response"

export interface PaginatedApiRequestParams {
  page: number
  perPage: number
  order?: 'asc' | 'desc'
  orderBy?: string
  term?: string
}

type ApiRequest = (params: PaginatedApiRequestParams, body?: any) => Promise<any>

export const usePaginatedApiRequest = async <SearchParams extends PaginatedApiRequestParams>(apiRequest: ApiRequest, searchParams?: SearchParams) => {
  const perPage = 5
  const data = []

  const page = searchParams?.page ?? 1
  let totalResults = 0
  const term = searchParams?.term

  // TOOD: this isnt very efficient, we should be able to get all pages together rather than in sequence
  for (let i = 1; i <= page; i++) {
    const coursesResponse: HttpSuccessPaginatedResponse<unknown[]> = await apiRequest({ term, page: i, perPage });

    if (coursesResponse?.data) {
      data.push(...coursesResponse.data)
      totalResults = coursesResponse.total // We dont really need to set this after every page fetch but here we are
    }
  }

  return {
    data,
    totalResults,
    page,
    perPage,
  }
}