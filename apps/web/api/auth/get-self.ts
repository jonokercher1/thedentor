import { CurrentUser } from '@/types/api/current-user'
import ApiClient from '../api-client'

export interface GetSelfResponse {
  data: CurrentUser
}

const getSelf = async (): Promise<GetSelfResponse> => {
  const apiClient = new ApiClient()
  return apiClient.GET<GetSelfResponse>('/me')
}

export default getSelf