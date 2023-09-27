import { CurrentUser } from '@/types/api/current-user'
import ApiClient from '@/api/api-client'

export interface RegisterBody {
  name: string
  email: string
  phone: string
  password: string
  passwordConfirmation: string
  gdcNumber: string
}

export interface RegisterResponse {
  data: CurrentUser
}

const register = async (body: RegisterBody): Promise<RegisterResponse> => {
  const apiClient = new ApiClient()
  return apiClient.POST<RegisterResponse, RegisterBody>('/register', body, { cache: 'no-cache' })
}

export default register