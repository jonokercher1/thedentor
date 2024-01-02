import 'server-only'

import { ServerApiClient } from '@/api/server-api-client'
import { HttpSuccessResponse } from '@/types/api/http-success-response'
import { PaginationInput } from '@/types/api/pagination'
import { Dentor } from '@/types/api/dentor/dentor'

export interface GetDentorResponse extends HttpSuccessResponse<Dentor> { }

const getDentor = async (dentorId: string): Promise<GetDentorResponse> => {
  const apiClient = new ServerApiClient()

  return apiClient.GET<GetDentorResponse>(`dentor/${dentorId}`)
}

export default getDentor