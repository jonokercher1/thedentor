import { type FC } from 'react'

// TODO: create correct type for pages 
const SearchInPersonCoursesPage: FC<any> = ({ searchParams }) => {
  console.log("🚀 ~ file: page.tsx:5 ~ searchParams:", searchParams)
  return (
    <div>
      <h1>search in person courses</h1>
      <p className="text-white">{searchParams.term}</p>
    </div>
  )
}

export default SearchInPersonCoursesPage