import 'server-only'

import { ServerApiClient } from '@/api/server-api-client'
import { Course } from '@/types/api/course/course'
import { PaginationInput } from '@/types/api/pagination'
import { constructApiRequestParameters } from '@/utils/api'
import { HttpSucccessPaginatedResponse } from '@/types/api/http-success-paginated-response'

export interface GetCoursesResponse extends HttpSucccessPaginatedResponse<Course[]> { }

export interface GetCourseFilters {
  dentors?: string[]
}

const getCourses = async (search?: string, filters?: GetCourseFilters, pagination?: PaginationInput): Promise<GetCoursesResponse> => {
  console.log('calling get courses')
  const apiClient = new ServerApiClient()
  const paginationOptions: Record<string, string> = {
    page: pagination?.page?.toString() ?? '1',
    perPage: pagination?.perPage?.toString() ?? '5',
    order: pagination?.order ?? 'desc',
    orderBy: pagination?.orderBy ?? 'startDate'
  }

  const queryParams = constructApiRequestParameters({
    ...paginationOptions,
    ...(search ? { search } : {}),
    ...(filters?.dentors ? { dentors: filters.dentors } : {})
  })

  return apiClient.GET<GetCoursesResponse>(`course?${queryParams.toString()}`)
}

export default getCourses