import { HttpSuccessResponse } from '@/types/api/http-success-response'
import { BrowserApiClient } from '@/api/browser-api-client'

export interface GenerateOneTimePasswordBody {
  email: string
}

export interface GenerateOneTimePasswordResponse extends HttpSuccessResponse<{ createdAt: string }> { }

const generateOneTimePassword = async (body?: GenerateOneTimePasswordBody): Promise<GenerateOneTimePasswordResponse> => {
  const apiClient = new BrowserApiClient()
  return apiClient.POST<GenerateOneTimePasswordResponse, GenerateOneTimePasswordBody>('auth/one-time-password', body, { cache: 'no-cache' })
}

export default generateOneTimePassword