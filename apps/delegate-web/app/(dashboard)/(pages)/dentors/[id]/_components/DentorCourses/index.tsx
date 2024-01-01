import { FC, Suspense } from "react"
import DentorCoursesLoading from "./DentorCoursesLoading"
import DentorCoursesContent from "./DentorCoursesContent"

export interface DentorCoursesProps { }

const DentorCourses: FC<DentorCoursesProps> = () => {
  return (
    <Suspense fallback={<DentorCoursesLoading />}>
      <DentorCoursesContent />
    </Suspense>
  )
}

export default DentorCourses