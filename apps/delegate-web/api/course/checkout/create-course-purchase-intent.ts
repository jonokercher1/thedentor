import 'server-only'

import { HttpSuccessResponse } from '@/types/api/http-success-response'
import { ServerApiClient } from '@/api/server-api-client'

export interface CreateCoursePurchaseIntentResponse extends HttpSuccessResponse<{ clientSecret: string }> { }

const createCoursePurchaseIntent = async (courseId?: string): Promise<CreateCoursePurchaseIntentResponse> => {
  const apiClient = new ServerApiClient()

  return apiClient.PUT<CreateCoursePurchaseIntentResponse, undefined>(`course/checkout/${courseId}/intent`)
}

export default createCoursePurchaseIntent