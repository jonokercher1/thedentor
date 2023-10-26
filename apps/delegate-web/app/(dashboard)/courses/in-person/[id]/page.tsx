import { useParams } from 'next/navigation'
import { type FC } from 'react'

const CourseView = ({ params }: any) => {
  return (
    <main>
      <h1>Course View for course: {params?.id}</h1>
    </main>
  )
}

export default CourseView