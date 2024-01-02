
import { type FC } from 'react'
import SearchFilters from './_components/SearchFilters'
import { Container, usePaginatedApiRequest, type PaginatedApiRequestParams } from '@dentor/ui'
import InPersonSearchResults from './_components/SearchResults'
import { getCoursesServer } from '@/api/course/get-courses/get-courses-server'

const perPage = 5
// TODO: create correct type for pages 
const SearchInPersonCoursesPage: FC<any> = async ({ searchParams }) => {
  const page = searchParams.page ?? 1
  const term = searchParams?.term

  const useGetCourses = async (params: PaginatedApiRequestParams) => {
    return getCoursesServer({ search: params.term, page: params.page, perPage: params.perPage })
  }

  const { data, totalResults } = await usePaginatedApiRequest(useGetCourses, { term, page, perPage })

  return (
    <div>
      <section>
        <SearchFilters />
      </section>

      <section className="bg-neutral-800 py-20">
        <Container>
          <InPersonSearchResults
            results={data}
            perPage={perPage}
            totalResults={totalResults}
          />
        </Container>
      </section>
    </div>
  )
}

export default SearchInPersonCoursesPage