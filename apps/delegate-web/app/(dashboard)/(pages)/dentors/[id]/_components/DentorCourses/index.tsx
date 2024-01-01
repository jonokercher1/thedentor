import { FC, Suspense } from 'react'
import DentorCoursesLoading from './DentorCoursesLoading'
import DentorCoursesContent from './DentorCoursesContent'

export interface DentorCoursesProps {
  dentorId: string
}

const DentorCourses: FC<DentorCoursesProps> = ({ dentorId }) => {
  return (
    <Suspense fallback={<DentorCoursesLoading />}>
      <DentorCoursesContent
        dentorId={dentorId}
      />
    </Suspense>
  )
}

export default DentorCourses