import { CurrentUser } from '@/types/api/current-user'
import ApiClient from '../api-client'

export interface LoginBody {
  email: string
  password: string
}

export interface LoginResponse {
  data: CurrentUser
}

const login = async (body: LoginBody): Promise<LoginResponse> => {
  const apiClient = new ApiClient()
  return apiClient.POST<LoginResponse, LoginBody>('/login', body, { cache: 'no-cache' })
}

export default login