import 'server-only'

import { HttpSuccessResponse } from '@/types/api/http-success-response'
import { ServerApiClient } from '@/api/server-api-client'

export interface CreateCoursePurchaseIntentBody {
  courseId?: string
  email?: string
}

export interface CreateCoursePurchaseIntentResponse extends HttpSuccessResponse<{ clientSecret: string }> { }

const createCoursePurchaseIntent = async (body: CreateCoursePurchaseIntentBody): Promise<CreateCoursePurchaseIntentResponse> => {
  const apiClient = new ServerApiClient()

  return apiClient.PUT<CreateCoursePurchaseIntentResponse, CreateCoursePurchaseIntentBody | undefined>(
    `course/checkout/${body.courseId}/intent`,
    { email: body.email }
  )
}

export default createCoursePurchaseIntent