import { type FC } from 'react'
import CourseCard from '@/app/(dashboard)/courses/in-person/_components/CourseCard'
import TheDentorPremiumCard from '@/app/_components/TheDentorPremiumCard'
import getUpcomingInPersonCourses from '@/api/course/get-upcoming-in-person-courses'

const UpcomingCourses: FC = async () => {
  const { data: upcomingCourses } = await getUpcomingInPersonCourses()

  if (!upcomingCourses) {
    // TODO: what do we want to do here?
    return <></>
  }


  return (
    <section className="py-12">
      <header>
        <h2 className="text-white text-3xl mb-12">Upcoming Courses</h2>
      </header>

      <div className="grid lg:grid-cols-3 lg:gap-20">
        <section className="col-span-2 flex flex-col gap-12">
          {upcomingCourses.map((course, index) => {
            if (index === 2) {
              return (
                <>
                  <div className="lg:hidden">
                    <TheDentorPremiumCard className="h-[400px]" />
                  </div>

                  <CourseCard
                    key={`upcoming-courses-course-${course.id}`}
                    course={course}
                  />
                </>
              )
            } else {
              return (
                <CourseCard
                  key={`upcoming-courses-course-${course.id}`}
                  course={course}
                />
              )
            }

          })}
        </section>

        <aside className="hidden lg:block">
          <TheDentorPremiumCard className="h-[800px] top-12 sticky" />
        </aside>
      </div>
    </section>
  )
}

export default UpcomingCourses