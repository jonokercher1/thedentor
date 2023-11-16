import 'server-only'

import { ServerApiClient } from '@/api/server-api-client'
import { HttpSuccessResponse } from '@/types/api/http-success-response'
import { Course } from '@/types/api/course/course'
import { CourseType } from '@/types/api/course/course'
import { PaginationInput } from '@/types/api/pagination'

export interface GetFeaturedCoursesByTypeResponse extends HttpSuccessResponse<Course[]> { }

const getFeaturedCoursesByType = async (type: CourseType, pagination?: PaginationInput): Promise<GetFeaturedCoursesByTypeResponse> => {
  const apiClient = new ServerApiClient()
  const paginationOptions: Record<string, string> = {
    page: pagination?.page?.toString() ?? '1',
    perPage: pagination?.perPage?.toString() ?? '5',
    order: pagination?.order ?? 'desc',
    orderBy: pagination?.orderBy ?? 'featuredUntil'
  }

  const queryParams = new URLSearchParams(paginationOptions).toString()

  return apiClient.GET<GetFeaturedCoursesByTypeResponse>(`course/featured/${type}?${queryParams}`)
}

export default getFeaturedCoursesByType