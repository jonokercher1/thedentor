import { HttpSuccessResponse } from '@/types/api/http-success-response'
import { ClientApiClient } from '@/api/client-api-client'

export interface GenerateOneTimePasswordBody {
  email: string
}

export interface GenerateOneTimePasswordResponse extends HttpSuccessResponse<{ createdAt: string }> { }

const generateOneTimePassword = async (body?: GenerateOneTimePasswordBody): Promise<GenerateOneTimePasswordResponse> => {
  const apiClient = new ClientApiClient()
  return apiClient.POST<GenerateOneTimePasswordResponse, GenerateOneTimePasswordBody>('auth/one-time-password', body, { cache: 'no-cache' })
}

export default generateOneTimePassword