import { HttpSuccessResponse } from '@/types/api/http-success-response'
import { BrowserApiClient } from '@/api/browser-api-client'
import { CourseFeedbackResponse } from '@/types/api/course/course-feedback'

export interface CourseFeedbackAnswer {
  questionId: string
  answer: string | number
}

export interface SubmitCourseFeedbackBody {
  answers: CourseFeedbackAnswer[]
}

export interface SubmitCourseFeedbackArgs {
  answers: CourseFeedbackAnswer[]
  courseId: string
}

export interface SubmitCourseFeedbackResponse extends HttpSuccessResponse<CourseFeedbackResponse> { }

const submitCourseFeedback = async (args?: SubmitCourseFeedbackArgs): Promise<SubmitCourseFeedbackResponse> => {
  const apiClient = new BrowserApiClient()
  const { courseId, ...body } = args! // TODO: build a better generic type system this is poor

  return apiClient.PUT<SubmitCourseFeedbackResponse, SubmitCourseFeedbackBody>(
    `course/${courseId}/feedback/answers`,
    body,
    { cache: 'no-cache' }
  )
}

export default submitCourseFeedback