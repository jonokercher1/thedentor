import { type FC } from 'react'
import UpcomingCoursesGrid from './UpcomingCoursesGrid'
import { getUpcomingInPersonCourses } from '@/api/course/get-upcoming-in-person-courses/server'

const perPage = 5
const UpcomingCourses: FC = async () => {
  const { data: upcomingCourses, total } = await getUpcomingInPersonCourses({ page: 1, perPage })
  console.log("🚀 ~ file: UpcomingCourses.tsx:8 ~ constUpcomingCourses:FC= ~ upcomingCourses:", upcomingCourses)

  if (!upcomingCourses) {
    // TODO: what do we want to do here?
    return <></>
  }


  return (
    <section className="py-12">
      <header>
        <h2 className="text-white text-3xl mb-12">Upcoming Courses</h2>
      </header>

      <UpcomingCoursesGrid
        initialCourses={upcomingCourses}
        totalCourses={total}
        perPage={perPage}
      />
    </section>
  )
}

export default UpcomingCourses