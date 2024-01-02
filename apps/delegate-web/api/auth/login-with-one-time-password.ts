import { HttpSuccessResponse } from '@/types/api/http-success-response'
import { BrowserApiClient } from '@/api/browser-api-client'
import { CurrentUser } from '@/types/api/auth/current-user'

export interface LoginWithOneTimePasswordBody {
  email: string
  oneTimePassword: string
}

export interface LoginWithOneTimePasswordResponse extends HttpSuccessResponse<CurrentUser> { }

const loginWithOneTimePassword = async (body?: LoginWithOneTimePasswordBody): Promise<LoginWithOneTimePasswordResponse> => {
  const apiClient = new BrowserApiClient()
  return apiClient.POST<LoginWithOneTimePasswordResponse, LoginWithOneTimePasswordBody>('auth/one-time-password/login', body, { cache: 'no-cache' })
}

export default loginWithOneTimePassword