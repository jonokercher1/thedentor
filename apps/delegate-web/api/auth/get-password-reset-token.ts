import 'server-only'

import { HttpSuccessResponse } from '@/types/api/http-success-response'
import { ServerApiClient } from '@/api/server-api-client'

export interface GetPasswordResetTokenResponse extends HttpSuccessResponse<{}> { }

const getPasswordResetToken = async (token: string): Promise<GetPasswordResetTokenResponse> => {
  const apiClient = new ServerApiClient()
  return apiClient.GET<GetPasswordResetTokenResponse>(`auth/password-reset/${token}`)
}

export default getPasswordResetToken