import 'server-only'
import { CurrentUser } from '@/types/api/auth/current-user'
import { ServerApiClient } from '../server-api-client'
import { HttpSuccessResponse } from '@/types/api/http-success-response'
import { RequestOptions } from '../api-client'

export interface GetSelfResponse extends HttpSuccessResponse<CurrentUser> { }

const getSelf = async (options?: RequestOptions): Promise<GetSelfResponse> => {
  const apiClient = new ServerApiClient()
  return apiClient.GET<GetSelfResponse>('auth/me', options)
}

export default getSelf