import { type FC } from 'react'
import Categories from '@/app/(dashboard)/courses/in-person/_components/Categories'
import getCourseCategoriesByType from '@/api/course/category/get-course-categories-by-type'
import { CourseType } from '@/types/api/course/course'
import UpcomingCourses from '../_components/UpcomingCourses'
import FeaturedCourses from '../_components/FeaturedCourses'

const DiscoverInPersonCoursesPage: FC = async () => {
  const courseType = CourseType.InPerson
  const categories = await getCourseCategoriesByType(courseType)

  return (
    <main>
      <FeaturedCourses courseType={courseType} />
      <Categories categories={categories.data!} />
      <UpcomingCourses />
    </main>
  )
}

export default DiscoverInPersonCoursesPage