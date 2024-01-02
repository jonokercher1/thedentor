import { type FC } from 'react'
import { Container } from '@dentor/ui'
import DentorReviews from './_components/DentorReviews'
import getDentor from '@/api/dentor/get-dentor'
import { notFound } from 'next/navigation'
import DentorInPersonCourses from './_components/DentorInPersonCourses'
import DentorCoursesTabs from './_components/DentorCoursesTabs'
import DentorVideoCourses from './_components/DentorVideoCourses'

export enum DentorCoursesTab {
  Courses = 'courses',
  Videos = 'videos',
}

const DentorViewPage: FC = async ({ params, searchParams }: any) => {
  const dentorId = params.id
  const currentTab = searchParams.tab ?? DentorCoursesTab.Courses

  const dentor = await getDentor(dentorId)

  if (!dentor.data) {
    return notFound()
  }

  return (
    <main>
      <Container className="grid gap-8 lg:grid-cols-3 lg:gap-20 pb-20 pt-5">
        <aside className="lg:col-span-1">
          {/* TODO: add dentor profile picture */}
          <div className="h-96 aspect-square bg-accent-primary rounded-2xl mb-7" />
          <span className="font-bold text-accent-primary">Dentor</span>
          <h1 className="text-white text-3xl font-bold mt-1 mb-3">{dentor.data.name}</h1>
          <p className="text-white">{dentor.data.bio}</p>
        </aside>

        <section className="lg:col-span-2">
          <DentorCoursesTabs />

          {currentTab === DentorCoursesTab.Courses ? (
            <DentorInPersonCourses dentorId={dentor.data.id} />
          ) : (
            <DentorVideoCourses dentorId={dentor.data.id} />
          )}
        </section>
      </Container>

      <section className="bg-neutral-200">
        <Container>
          <DentorReviews dentor={dentor.data} />
        </Container>
      </section>
    </main >
  )
}

export default DentorViewPage

