import { Course } from '@/types/api/course/course'
import { HttpSuccessResponse } from '@/types/api/http-success-response'
import { ServerApiClient } from '../server-api-client'

export interface GetCourseResponse extends HttpSuccessResponse<Course> { }

const getCourse = async (courseId: string): Promise<GetCourseResponse> => {
  const apiClient = new ServerApiClient()
  return apiClient.GET<GetCourseResponse>(`course/${courseId}`)
}

export default getCourse