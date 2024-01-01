import { FC } from 'react'
import { DentorCoursesProps } from '.'

const DentorCoursesContent: FC<DentorCoursesProps> = async ({ params }: any) => {
  // await new Promise(r => setTimeout(r, 10000));

  return (
    <section>
      <h1>DentorCoursesContent</h1>
    </section>
  )
}

export default DentorCoursesContent