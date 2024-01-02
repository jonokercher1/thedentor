import { HttpSuccessResponse } from '@/types/api/http-success-response'
import { BrowserApiClient } from '@/api/browser-api-client'
import { CurrentUser } from '@/types/api/auth/current-user'

export interface UpdateSelfBody {
  name?: string
  email?: string
  phone?: string
  gdcNumber?: string
}

export interface UpdateSelfResposne extends HttpSuccessResponse<CurrentUser> { }

const updateSelf = async (body?: UpdateSelfBody): Promise<UpdateSelfResposne> => {
  const apiClient = new BrowserApiClient()
  return apiClient.PATCH<UpdateSelfResposne, UpdateSelfBody>('user/self', body, { cache: 'no-cache' })
}

export default updateSelf