import { FC, Suspense } from 'react'
import DentorCoursesLoading from './DentorInPersonCoursesLoading'
import DentorInPersonCoursesContent from './DentorInPersonCourses'

export interface DentorCoursesProps {
  dentorId: string
}

const DentorInPersonCourses: FC<DentorCoursesProps> = ({ dentorId }) => {
  return (
    <Suspense fallback={<DentorCoursesLoading />}>
      <DentorInPersonCoursesContent
        dentorId={dentorId}
      />
    </Suspense>
  )
}

export default DentorInPersonCourses