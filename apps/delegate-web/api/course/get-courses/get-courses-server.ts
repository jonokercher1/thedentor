import { ServerApiClient } from '@/api/server-api-client';
import getCourses, { GetCoursesFilters } from './get-courses';

export const getCoursesServer = (filters?: GetCoursesFilters) => getCourses(new ServerApiClient)(filters)