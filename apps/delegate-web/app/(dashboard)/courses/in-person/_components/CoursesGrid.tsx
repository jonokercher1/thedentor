import TheDentorPremiumCard from '@/app/_components/TheDentorPremiumCard'
import { Course } from '@/types/api/course/course'
import { type FC } from 'react'
import CourseCard from './CourseCard'
import { Button, ButtonVariant } from '@dentor/ui'

interface CoursesGridProps {
  courses: Course[]
  onFetchMore?: () => void
  isFetching?: boolean
  moreToFetch?: boolean
}

const CoursesGrid: FC<CoursesGridProps> = ({ courses, onFetchMore, isFetching, moreToFetch }) => {
  return (
    <div className="grid lg:grid-cols-3 lg:gap-20">
      <section className="col-span-2 flex items-center flex-col">
        <div className="flex flex-col gap-12 w-full">
          {courses.map((course, index) => {
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

        {moreToFetch && onFetchMore && (
          <Button
            className="mx-auto w-80 mt-20"
            variant={ButtonVariant.Tertiary}
            onClick={onFetchMore}
            loading={isFetching}
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

export default CoursesGrid