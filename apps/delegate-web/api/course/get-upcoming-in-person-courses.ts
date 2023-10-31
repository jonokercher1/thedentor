import 'server-only'

import { ServerApiClient } from '@/api/server-api-client'
import { HttpSuccessResponse } from '@/types/api/http-success-response'
import { Course } from '@/types/api/course/course'
import { PaginationInput } from '@/types/api/pagination'

export interface GetUpcomingInPersonCoursesResponse extends HttpSuccessResponse<Course[]> { }

// TODO: get pagination to work in a server component (probably using searchParams? -> maybe we cant do this server side, we might need a client version of this request too)
const getUpcomingInPersonCourses = async (pagination?: PaginationInput): Promise<GetUpcomingInPersonCoursesResponse> => {
  const apiClient = new ServerApiClient()
  const paginationOptions: Record<string, string> = {
    page: pagination?.page?.toString() ?? '1',
    perPage: pagination?.perPage?.toString() ?? '5',
    order: pagination?.order ?? 'desc',
    orderBy: pagination?.orderBy ?? 'featuredUntil'
  }

  const queryParams = new URLSearchParams(paginationOptions).toString()

  return apiClient.GET<GetUpcomingInPersonCoursesResponse>(`course/in-person/upcoming?${queryParams}`)
}

export default getUpcomingInPersonCourses