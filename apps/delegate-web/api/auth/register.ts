import { CurrentUser } from '@/types/api/auth/current-user'
import { ClientApiClient } from '@/api/client-api-client'
import { HttpSuccessResponse } from '@/types/api/http-success-response'

export interface RegisterBody {
  name: string
  email: string
  phone: string
  password: string
  passwordConfirmation: string
  gdcNumber: string
}

export interface RegisterResponse extends HttpSuccessResponse<CurrentUser> { }

const register = async (body: RegisterBody): Promise<RegisterResponse> => {
  const apiClient = new ClientApiClient()
  return apiClient.POST<RegisterResponse, RegisterBody>('auth/register', body, { cache: 'no-cache' })
}

export default register