import getCourses from '@/api/course/get-courses'
import { type FC } from 'react'
import SearchFilters from './_components/SearchFilters'
import { Container } from '@dentor/ui'
import { Course } from '@/types/api/course/course'
import InPersonSearchResults from './_components/SearchResults'

const perPage = 5
// TODO: create correct type for pages 
const SearchInPersonCoursesPage: FC<any> = async ({ searchParams }) => {
  const page = searchParams.page ?? 1
  const courses: Course[] = []
  const totalResults = 10
  const search = searchParams?.term

  // TOOD: this isnt very efficient, we should be able to get all pages together rather than in sequence
  for (let i = 1; i <= page; i++) {
    const coursesResponse = await getCourses(search, {}, { page: i, perPage })

    if (coursesResponse?.data) {
      courses.push(...coursesResponse.data)
    }
  }

  return (
    <div>
      <section>
        <SearchFilters />
      </section>

      <section className="bg-neutral-800 py-20">
        <Container>
          <InPersonSearchResults
            results={courses}
            perPage={perPage}
            totalResults={totalResults}
          />
        </Container>
      </section>
    </div>
  )
}

export default SearchInPersonCoursesPage