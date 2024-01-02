import { Course } from '@/types/api/course/course'
import { PaginationInput } from '@/types/api/pagination'
import { constructApiRequestParameters } from '@/utils/api'
import { HttpSucccessPaginatedResponse } from '@/types/api/http-success-paginated-response'
import { ApiClient } from '@/api/api-client'

export interface GetCoursesResponse extends HttpSucccessPaginatedResponse<Course[]> { }

export interface GetCoursesFilters extends PaginationInput {
  dentors?: string[]
  search?: string
}

const getCourses = (apiClient: ApiClient) => async (filters?: GetCoursesFilters): Promise<GetCoursesResponse> => {
  const paginationOptions: Record<string, string> = {
    page: filters?.page?.toString() ?? '1',
    perPage: filters?.perPage?.toString() ?? '5',
    order: filters?.order ?? 'desc',
    orderBy: filters?.orderBy ?? 'startDate'
  }

  const queryParams = constructApiRequestParameters({
    ...paginationOptions,
    ...(filters?.search ? { search: filters.search } : {}),
    ...(filters?.dentors ? { dentors: filters.dentors } : {})
  })

  return apiClient.GET<GetCoursesResponse>(`course?${queryParams.toString()}`)
}

export default getCourses