import { type FC } from 'react'
import FeaturedCourseCard from './FeaturedCourseCard'
import { Carousel } from '@dentor/ui'
import { CourseType } from '@/types/api/course/course'
import getFeaturedCoursesByType from '@/api/course/get-featured-courses-by-type'

interface FeaturedCoursesProps {
  courseType: CourseType
}

const FeaturedCourses: FC<FeaturedCoursesProps> = async ({ courseType }) => {
  const { data: featuredCourses } = await getFeaturedCoursesByType(courseType)

  if (!featuredCourses) {
    // TODO: what do we want to do here?
    return <></>
  }

  return (
    <section className="py-12">
      <div>
        <Carousel
          pagination
          loop
          gap={50}
          items={
            featuredCourses.map((course) => (
              <FeaturedCourseCard
                key={`featured-courses-course-${course.id}`}
                course={course}
              />
            ))
          }
        />
      </div>
    </section>
  )
}

export default FeaturedCourses