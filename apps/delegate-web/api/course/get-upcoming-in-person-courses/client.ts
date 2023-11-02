import { ClientApiClient } from '@/api/client-api-client'
import { makeGetUpcomingInPersonCoursesCall } from '@/api/course/get-upcoming-in-person-courses'

export const getUpcomingInPersonCourses = makeGetUpcomingInPersonCoursesCall(new ClientApiClient())