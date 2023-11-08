import getCourses from '@/api/course/get-courses'
import { type FC } from 'react'

// TODO: create correct type for pages 
const SearchInPersonCoursesPage: FC<any> = async ({ searchParams }) => {
  const search = searchParams?.term
  const courses = await getCourses(search)
  console.log("🚀 ~ file: page.tsx:8 ~ constSearchInPersonCoursesPage:FC<any>= ~ courses:", courses)
  return (
    <div>
      <h1>search in person courses</h1>
      <p className="text-white">{searchParams.term}</p>
    </div>
  )
}

export default SearchInPersonCoursesPage