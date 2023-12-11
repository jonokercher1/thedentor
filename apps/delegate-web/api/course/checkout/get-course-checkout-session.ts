import 'server-only'

import { HttpSuccessResponse } from '@/types/api/http-success-response'
import { ServerApiClient } from '@/api/server-api-client'

export interface GetCourseCheckoutSessionResponse extends HttpSuccessResponse<{ clientSecret: string }> { }

const getCourseCheckoutSession = async (courseId?: string): Promise<GetCourseCheckoutSessionResponse> => {
  const apiClient = new ServerApiClient()

  return apiClient.GET<GetCourseCheckoutSessionResponse>(`course/checkout/${courseId}`)
}

export default getCourseCheckoutSession