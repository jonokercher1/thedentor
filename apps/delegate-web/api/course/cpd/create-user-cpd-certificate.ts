import { HttpSuccessResponse } from '@/types/api/http-success-response'
import { BrowserApiClient } from '@/api/browser-api-client'
import { CpdCertificate } from '@/types/api/cpd/cpd-certificate'

export interface CreateUserCpdCertificateArgs {
  courseId: string
}

export interface CreateUserCpdCertificateResponse extends HttpSuccessResponse<CpdCertificate> { }

const createUserCpdCertificate = async (body?: CreateUserCpdCertificateArgs): Promise<CreateUserCpdCertificateResponse> => {
  const apiClient = new BrowserApiClient()

  return apiClient.PUT<CreateUserCpdCertificateResponse, CreateUserCpdCertificateArgs>(`cpd-certificate`, body)
}

export default createUserCpdCertificate