import { HttpSuccessResponse } from '@/types/api/http-success-response'
import { CpdCertificate } from '@/types/api/cpd/cpd-certificate'
import { RequestOptions } from '@/api/api-client'
import { BrowserApiClient } from '@/api/browser-api-client'

export interface GetCpdCertificateResponse extends HttpSuccessResponse<CpdCertificate> { }

const getCpdCertificate = async (certificateId: string, requestOptions?: RequestOptions): Promise<GetCpdCertificateResponse> => {
  const apiClient = new BrowserApiClient()
  return apiClient.GET<GetCpdCertificateResponse>(`cpd-certificate/${certificateId}`, requestOptions)
}

export default getCpdCertificate