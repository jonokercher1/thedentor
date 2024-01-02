import { FC, Suspense } from 'react'
import DentorVideoCoursesLoading from './DentorVideoCoursesLoading'
import DentorVideoCoursesContent from './DentorVideoCourses'

export interface DentorVideoCourseProps {
  dentorId: string
}

const DentorVideoCourses: FC<DentorVideoCourseProps> = ({ dentorId }) => {
  return (
    <Suspense fallback={<DentorVideoCoursesLoading />}>
      <DentorVideoCoursesContent
        dentorId={dentorId}
      />
    </Suspense>
  )
}

export default DentorVideoCourses