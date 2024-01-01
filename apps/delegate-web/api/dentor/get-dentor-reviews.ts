import 'server-only'

import { ServerApiClient } from '@/api/server-api-client'
import { HttpSuccessResponse } from '@/types/api/http-success-response'
import { PaginationInput } from '@/types/api/pagination'
import { Dentor } from '@/types/api/dentor/dentor'
import { Review } from '@/types/api/review/review'

export interface GetDentorReviewsResponse extends HttpSuccessResponse<Review[]> { }

const getDentorReviews = async (dentorId: string, pagination?: PaginationInput): Promise<GetDentorReviewsResponse> => {
  const apiClient = new ServerApiClient()
  const paginationOptions: Record<string, string> = {
    page: pagination?.page?.toString() ?? '1',
    perPage: pagination?.perPage?.toString() ?? '12',
    order: pagination?.order ?? 'desc',
    orderBy: pagination?.orderBy ?? 'createdAt'
  }

  const queryParams = new URLSearchParams(paginationOptions).toString()

  return apiClient.GET<GetDentorReviewsResponse>(`dentor/${dentorId}/reviews?${queryParams}`)
}

export default getDentorReviews