import { type FC } from 'react'
import Categories from '@/app/(dashboard)/courses/in-person/_components/Categories'
import getCourseCategoriesByType from '@/api/course/category/get-course-categories-by-type'
import { CourseType } from '@/types/api/course/course'
import UpcomingCourses from '../_components/UpcomingCourses'

const DiscoverInPersonCoursesPage: FC = async () => {
  const categories = await getCourseCategoriesByType(CourseType.InPerson)

  return (
    <main>
      <Categories categories={categories.data!} />
      <UpcomingCourses />
    </main>
  )
}

export default DiscoverInPersonCoursesPage