'use client'

import { Course } from '@/types/api/course/course'
import { useState, type FC } from 'react'
import CourseCard from '@/app/(dashboard)/courses/in-person/_components/CourseCard'
import TheDentorPremiumCard from '@/app/_components/TheDentorPremiumCard'
import { Button, ButtonVariant, useApiRequest } from '@dentor/ui'
import { getUpcomingInPersonCourses } from '@/api/course/get-upcoming-in-person-courses/client'
import { type GetUpcomingInPersonCoursesResponse } from '@/api/course/get-upcoming-in-person-courses'
import { PaginationInput } from '@/types/api/pagination'

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
    <div className="grid lg:grid-cols-3 lg:gap-20">
      <section className="col-span-2 flex items-center flex-col">
        <div className="flex flex-col gap-12">
          {upcomingCourses.map((course, index) => {
            const key = `upcoming-courses-course-${course.id}`
            if (index === 2) {
              return (
                <div key={key}>
                  <div className="lg:hidden">
                    <TheDentorPremiumCard className="h-[400px]" />
                  </div>

                  <CourseCard
                    course={course}
                  />
                </div>
              )
            }

            return (
              <CourseCard
                key={key}
                course={course}
              />
            )
          })}
        </div>

        {moreToFetch && (
          <Button
            className="mx-auto w-80 mt-20"
            variant={ButtonVariant.Tertiary}
            onClick={onFetchMore}
            loading={isLoading}
          >
            <p>Load More</p>
          </Button>
        )}
      </section>

      <aside className="hidden lg:block">
        <TheDentorPremiumCard className="h-[800px] top-12 sticky" />
      </aside>
    </div>
  )
}

export default UpcomingCoursesGrid;