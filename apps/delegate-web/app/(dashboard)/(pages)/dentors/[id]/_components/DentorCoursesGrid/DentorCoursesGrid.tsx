'use client'

import CourseCard from '@/app/(dashboard)/(pages)/courses/in-person/_components/CourseCard'
import { Course } from '@/types/api/course/course'
import { Button, ButtonVariant } from '@dentor/ui'
import { type FC } from 'react'

interface DentorCoursesGrid {
  courses: Course[]
}

const DentorCoursesGrid: FC<DentorCoursesGrid> = ({ courses }) => {
  return (
    <section className="grid gap-8">
      {courses.map((course) => (
        <CourseCard
          key={`dentor-courses-${course.id}`}
          course={course}
        />
      ))}

      <Button
        className="mx-auto w-80"
        variant={ButtonVariant.Tertiary}
      // onClick={onFetchMore}
      // loading={isFetching}
      >
        <p>Load More</p>
      </Button>
    </section>
  )
}

export default DentorCoursesGrid