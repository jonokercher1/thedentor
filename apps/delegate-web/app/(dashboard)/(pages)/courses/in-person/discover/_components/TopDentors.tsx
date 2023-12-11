import getFeaturedDentors from '@/api/dentor/get-featured-dentors'
import { type FC } from 'react'
import TopDentorChip from './TopDentorChip'
import { Container } from '@dentor/ui'

const TopDentors: FC = async () => {
  const { data: featuredDentors } = await getFeaturedDentors()

  if (!featuredDentors) {
    return <></>
  }

  return (
    <section className="py-16 xl:py-24 bg-neutral-800">
      <Container>
        <header>
          <h2 className="text-white text-3xl mb-12">Our Top Dentors</h2>
        </header>

        <div className="grid gap-8 md:grid-cols-2 xl:grid-cols-3 lg:gap-12">
          {featuredDentors?.map((dentor) => (
            <TopDentorChip
              dentor={dentor}
            />
          ))}
        </div>
      </Container>
    </section>
  )
}

export default TopDentors