import 'server-only'

import { ServerApiClient } from '@/api/server-api-client'
import { HttpSuccessResponse } from '@/types/api/http-success-response'
import { Course } from '@/types/api/course/course'
import { PaginationInput } from '@/types/api/pagination'

export interface GetCoursesResponse extends HttpSuccessResponse<Course[]> { }

// TODO: add in course filters here
const getCourses = async (search?: string, filters?: any, pagination?: PaginationInput): Promise<GetCoursesResponse> => {
  const apiClient = new ServerApiClient()
  const paginationOptions: Record<string, string> = {
    page: pagination?.page?.toString() ?? '1',
    perPage: pagination?.perPage?.toString() ?? '5',
    order: pagination?.order ?? 'desc',
    orderBy: pagination?.orderBy ?? 'startDate'
  }

  const requestFilters: Record<string, string> = {
    ...paginationOptions,
    ...(search ? { search } : {})
    // TODO: add in filters
  }

  const queryParams = new URLSearchParams(requestFilters).toString()

  return apiClient.GET<GetCoursesResponse>(`course/?${queryParams}`)
}

export default getCourses