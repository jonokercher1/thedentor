import { HttpSuccessResponse } from '@/types/api/http-success-response'
import { ClientApiClient } from '@/api/client-api-client'

export interface ResetPasswordBody {
  token: string
  password: string
  passwordConfirmation: string
}

export interface ResetPasswordResponse extends HttpSuccessResponse<{}> { }

const resetPassword = async (body: ResetPasswordBody): Promise<ResetPasswordResponse> => {
  const apiClient = new ClientApiClient()
  return apiClient.PATCH<ResetPasswordResponse, ResetPasswordBody>('auth/password-reset', body, { cache: 'no-cache' })
}

export default resetPassword