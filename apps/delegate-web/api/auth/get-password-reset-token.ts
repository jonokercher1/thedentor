import 'server-only'

import { ServerApiClient } from '../server-api-client'
import { HttpSuccessResponse } from '@/types/api/http-success-response'

export interface GetPasswordResetTokenResponse extends HttpSuccessResponse<{}> { }

const getPasswordResetToken = async (token: string): Promise<GetPasswordResetTokenResponse> => {
  const apiClient = new ServerApiClient()
  return apiClient.GET<GetPasswordResetTokenResponse>(`auth/password-reset/${token}`)
}

export default getPasswordResetToken