import 'server-only'
import { CurrentUser } from '@/types/api/current-user'
import { ServerApiClient } from '../server-api-client'
import { HttpSuccessResponse } from '@/types/api/http-success-response'

export interface GetSelfResponse extends HttpSuccessResponse<CurrentUser> { }

const getSelf = async (): Promise<GetSelfResponse> => {
  const apiClient = new ServerApiClient()
  return apiClient.GET<GetSelfResponse>('auth/me')
}

export default getSelf