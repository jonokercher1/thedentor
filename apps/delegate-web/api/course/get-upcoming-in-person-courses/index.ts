import { ApiClient } from '@/api/api-client';
import { Course } from '@/types/api/course/course';
import { PaginationInput } from '@/types/api/pagination';
import { HttpSuccessPaginatedResponse } from '@dentor/ui/types/api/http-success-response';

export interface GetUpcomingInPersonCoursesResponse extends HttpSuccessPaginatedResponse<Course[]> { }

export const makeGetUpcomingInPersonCoursesCall = (apiClient: ApiClient) => async (pagination?: PaginationInput): Promise<GetUpcomingInPersonCoursesResponse> => {
  const paginationOptions: Record<string, string> = {
    page: pagination?.page?.toString() ?? '1',
    perPage: pagination?.perPage?.toString() ?? '5',
    order: pagination?.order ?? 'desc',
    orderBy: pagination?.orderBy ?? 'featuredUntil'
  };

  const queryParams = new URLSearchParams(paginationOptions).toString();

  return apiClient.GET<GetUpcomingInPersonCoursesResponse>(`course/in-person/upcoming?${queryParams}`);
};
