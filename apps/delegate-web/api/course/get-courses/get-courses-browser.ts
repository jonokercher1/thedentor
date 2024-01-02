import { BrowserApiClient } from '@/api/browser-api-client';
import getCourses, { GetCoursesFilters } from './get-courses';

export const getCoursesBrowser = (filters?: GetCoursesFilters) => getCourses(new BrowserApiClient)(filters)