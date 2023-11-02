import 'server-only'

import { ServerApiClient } from '@/api/server-api-client'
import { makeGetUpcomingInPersonCoursesCall } from '@/api/course/get-upcoming-in-person-courses'

export const getUpcomingInPersonCourses = makeGetUpcomingInPersonCoursesCall(new ServerApiClient())