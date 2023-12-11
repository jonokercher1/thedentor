'use client'

import { Course } from '@/types/api/course/course'
import { useState, type FC } from 'react'
import CourseCard from '@/app/(dashboard)/(pages)/courses/in-person/_components/CourseCard'
import TheDentorPremiumCard from '@/app/_components/TheDentorPremiumCard'
import { Button, ButtonVariant, useApiRequest } from '@dentor/ui'
import { getUpcomingInPersonCourses } from '@/api/course/get-upcoming-in-person-courses/client'
import { type GetUpcomingInPersonCoursesResponse } from '@/api/course/get-upcoming-in-person-courses'
import { PaginationInput } from '@/types/api/pagination'
import CoursesGrid from '../../_components/CoursesGrid'

interface UpcomingCoursesGridProps {
  initialCourses: Course[]
  totalCourses: number
  perPage: number
}

const UpcomingCoursesGrid: FC<UpcomingCoursesGridProps> = ({ initialCourses, totalCourses, perPage }) => {
  const [upcomingCourses, setUpcomingCourses] = useState(initialCourses)
  const [page, setPage] = useState(1)
  const { isLoading, sendApiRequest } = useApiRequest<GetUpcomingInPersonCoursesResponse, PaginationInput>({
    request: getUpcomingInPersonCourses,
    onSuccess: (data) => {
      if (data?.data) {
        setUpcomingCourses([...upcomingCourses, ...data?.data])
      }
    },
    onError: console.error,
  })

  const moreToFetch = page * perPage < totalCourses

  const onFetchMore = async () => {
    if (!moreToFetch) return

    const newPage = page + 1
    sendApiRequest({ page: newPage, perPage: 3 })
    setPage(newPage)
  }

  return (
    <CoursesGrid
      courses={upcomingCourses}
      isFetching={isLoading}
      onFetchMore={onFetchMore}
      moreToFetch={moreToFetch}
    />
  )
}

export default UpcomingCoursesGrid;