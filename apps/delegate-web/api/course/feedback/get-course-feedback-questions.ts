import 'server-only'

import { ServerApiClient } from '@/api/server-api-client'
import { PaginationInput } from '@/types/api/pagination'
import { CourseFeedbackQuestion } from '@/types/api/course/course-feedback'
import { HttpSuccessPaginatedResponse } from '@dentor/ui/types/api/http-success-response'

export interface GetCourseFeedbackQuestionsResponse extends HttpSuccessPaginatedResponse<CourseFeedbackQuestion[]> { }

const getCourseFeedbackQuestions = async (courseId: string, pagination?: PaginationInput): Promise<GetCourseFeedbackQuestionsResponse> => {
  const apiClient = new ServerApiClient()
  const paginationOptions: Record<string, string> = {
    page: pagination?.page?.toString() ?? '1',
    perPage: pagination?.perPage?.toString() ?? '200', // this isnt ideal as there could be more but I dont see this happening
  }

  const queryParams = new URLSearchParams(paginationOptions).toString()

  return apiClient.GET<GetCourseFeedbackQuestionsResponse>(`course/${courseId}/feedback/questions?${queryParams}`)
}

export default getCourseFeedbackQuestions