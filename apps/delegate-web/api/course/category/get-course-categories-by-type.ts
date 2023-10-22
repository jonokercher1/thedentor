import 'server-only'

import { ServerApiClient } from '@/api/server-api-client'
import { HttpSuccessResponse } from '@/types/api/http-success-response'
import { CourseCategory } from '@/types/api/course/category/course-category'
import { CourseType } from '@/types/api/course/course'

export interface GetCourseCategoriesByTypeResponse extends HttpSuccessResponse<CourseCategory[]> { }

const getCourseCategoriesByType = async (type?: CourseType): Promise<GetCourseCategoriesByTypeResponse> => {
  const apiClient = new ServerApiClient()
  // TODO: need to add the type arg here when courses are added in
  return apiClient.GET<GetCourseCategoriesByTypeResponse>(`course-category`)
}

export default getCourseCategoriesByType