import { CurrentUser } from '@/types/api/current-user'
import { ClientApiClient } from '@/api/client-api-client'
import { HttpSuccessResponse } from '@/types/api/http-success-response'


export interface RequestPasswordResetBody {
  email: string
}

const requestPasswordReset = async (body?: RequestPasswordResetBody): Promise<undefined> => {
  const apiClient = new ClientApiClient()
  return apiClient.PUT<undefined, RequestPasswordResetBody>('auth/password-reset/token', body, { cache: 'no-cache' })
}

export default requestPasswordReset