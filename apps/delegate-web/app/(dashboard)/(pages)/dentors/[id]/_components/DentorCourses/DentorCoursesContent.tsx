import { FC } from 'react'
import { DentorCoursesProps } from '.'
import DentorCoursesGrid from '../DentorCoursesGrid/DentorCoursesGrid'
import { getCoursesServer } from '@/api/course/get-courses/get-courses-server'

const perPage = 5
const DentorCoursesContent: FC<DentorCoursesProps> = async ({ dentorId }) => {
  const dentorCourses = await getCoursesServer({ dentors: [dentorId], page: 1, perPage })

  if (!dentorCourses.data) {
    return null
  }

  return (
    <DentorCoursesGrid
      initialCourses={dentorCourses.data}
      totalCourses={dentorCourses.total}
      dentorId={dentorId}
    />
  )
}

export default DentorCoursesContent