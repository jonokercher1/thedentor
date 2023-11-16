import { CurrentUser } from '@/types/api/auth/current-user'
import { HttpSuccessResponse } from '@/types/api/http-success-response'
import { ClientApiClient } from '@/api/client-api-client'

export interface LoginBody {
  email: string
  password: string
  remember?: boolean
}

export interface LoginResponse extends HttpSuccessResponse<CurrentUser> { }

const login = async (body?: LoginBody): Promise<LoginResponse> => {
  const apiClient = new ClientApiClient()
  return apiClient.POST<LoginResponse, LoginBody>('auth/login', body, { cache: 'no-cache' })
}

export default login