import { ClientApiClient } from '@/api/client-api-client'

export interface RequestPasswordResetBody {
  email: string
}

const requestPasswordReset = async (body?: RequestPasswordResetBody): Promise<undefined> => {
  const apiClient = new ClientApiClient()
  return apiClient.PUT<undefined, RequestPasswordResetBody>('auth/password-reset/token', body, { cache: 'no-cache' })
}

export default requestPasswordReset