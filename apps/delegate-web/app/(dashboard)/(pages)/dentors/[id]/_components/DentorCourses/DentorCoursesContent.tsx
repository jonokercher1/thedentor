import { FC } from 'react'
import { DentorCoursesProps } from '.'
import getCourses from '@/api/course/get-courses'
import DentorCoursesGrid from '../DentorCoursesGrid/DentorCoursesGrid'

const DentorCoursesContent: FC<DentorCoursesProps> = async ({ dentorId }) => {
  const dentorCourses = await getCourses(undefined, { dentors: [dentorId] })
  console.log("🚀 ~ file: DentorCoursesContent.tsx:7 ~ constDentorCoursesContent:FC<DentorCoursesProps>= ~ dentorCourses:", dentorCourses)
  if (!dentorCourses.data) {
    return null
  }

  return (
    <DentorCoursesGrid
      courses={dentorCourses.data}
    />
  )
}

export default DentorCoursesContent