'use client'

import { GetCoursesFilters, GetCoursesResponse } from '@/api/course/get-courses/get-courses'
import { getCoursesBrowser } from '@/api/course/get-courses/get-courses-browser'
import CourseCard from '@/app/(dashboard)/(pages)/courses/in-person/_components/CourseCard'
import { Course } from '@/types/api/course/course'
import { PaginationInput } from '@/types/api/pagination'
import { Button, ButtonVariant, useApiRequest } from '@dentor/ui'
import { useState, type FC } from 'react'

interface DentorCoursesGrid {
  initialCourses: Course[]
  totalCourses: number
  dentorId: string
}

const perPage = 5
const DentorCoursesGrid: FC<DentorCoursesGrid> = ({ initialCourses, totalCourses, dentorId }) => {
  const [courses, setCourses] = useState(initialCourses)
  const [page, setPage] = useState(1)
  const { isLoading, sendApiRequest } = useApiRequest<GetCoursesResponse, GetCoursesFilters>({
    request: getCoursesBrowser,
    onSuccess: (data) => {
      if (data?.data) {
        setCourses([...courses, ...data?.data])
      }
    },
    onError: console.error,
  })

  const moreToFetch = page * perPage < totalCourses

  const onFetchMore = async () => {
    if (!moreToFetch) return

    const newPage = page + 1
    sendApiRequest({ page: newPage, perPage, dentors: [dentorId] })
    setPage(newPage)
  }

  return (
    <section className="grid gap-8">
      {courses.map((course) => (
        <CourseCard
          key={`dentor-courses-${course.id}`}
          course={course}
        />
      ))}

      {moreToFetch && (
        <Button
          className="mx-auto w-80"
          variant={ButtonVariant.Tertiary}
          onClick={onFetchMore}
          loading={isLoading}
        >
          <p>Load More</p>
        </Button>
      )}
    </section>
  )
}

export default DentorCoursesGrid