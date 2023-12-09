import { type FC } from 'react'

const CourseView: FC = async ({ params }: any) => {

  return (
    <section>
      <h1>Course View for course: {params?.id}</h1>
    </section>
  )
}

export default CourseView