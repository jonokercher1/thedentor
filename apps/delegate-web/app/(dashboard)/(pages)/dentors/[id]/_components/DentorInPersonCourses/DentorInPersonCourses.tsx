import { FC } from 'react'
import { DentorCoursesProps } from '.'
import DentorCoursesGrid from '../DentorCoursesGrid'
import { getCoursesServer } from '@/api/course/get-courses/get-courses-server'

const perPage = 5
const DentorInPersonCourses: FC<DentorCoursesProps> = async ({ dentorId }) => {
  const dentorCourses = await getCoursesServer({ dentors: [dentorId], page: 1, perPage })

  if (!dentorCourses.data?.length) {
    // TOOD: no courses card
    return (
      <p className="text-white font-bold text-xl">No Courses</p>
    )
  }

  return (
    <DentorCoursesGrid
      initialCourses={dentorCourses.data}
      totalCourses={dentorCourses.total}
      dentorId={dentorId}
    />
  )
}

export default DentorInPersonCourses