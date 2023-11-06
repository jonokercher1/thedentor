import 'server-only'

import { ServerApiClient } from '@/api/server-api-client'
import { HttpSuccessResponse } from '@/types/api/http-success-response'
import { PaginationInput } from '@/types/api/pagination'
import { Dentor } from '@/types/api/dentor/dentor'

export interface GetFeaturedDentorsResponse extends HttpSuccessResponse<Dentor[]> { }

const getFeaturedDentors = async (pagination?: PaginationInput): Promise<GetFeaturedDentorsResponse> => {
  const apiClient = new ServerApiClient()
  const paginationOptions: Record<string, string> = {
    page: pagination?.page?.toString() ?? '1',
    perPage: pagination?.perPage?.toString() ?? '6',
  }

  const queryParams = new URLSearchParams(paginationOptions).toString()

  return apiClient.GET<GetFeaturedDentorsResponse>(`dentor/featured?${queryParams}`)
}

export default getFeaturedDentors