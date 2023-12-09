'use client'

import { Course } from '@/types/api/course/course'
import { useState, type FC, useEffect } from 'react'
import CoursesGrid from '../../_components/CoursesGrid'
import useModifiableSearchParams from '@/hooks'

interface InPersonSearchResultsProps {
  results: Course[]
  totalResults: number
  perPage: number
}

const InPersonSearchResults: FC<InPersonSearchResultsProps> = ({ results, totalResults, perPage }) => {
  const searchParams = useModifiableSearchParams()
  const defaultPageNumber = searchParams.get('page') ? Number(searchParams.get('page')) : 1

  const [page, setPage] = useState<number>(defaultPageNumber)

  const moreToFetch = page * perPage < totalResults

  const onFetchMore = () => {
    searchParams.set('page', page.toString())
    searchParams.persistStateToUrl({ scroll: false })
  }

  const onNextPage = () => {
    setPage(page + 1)
  }

  useEffect(() => {
    if (page !== 1) {
      onFetchMore()
    }
  }, [page])

  return (
    <>
      {results.length ? (
        <CoursesGrid
          courses={results}
          onFetchMore={onNextPage}
          moreToFetch={moreToFetch}
        />
      ) : (
        // TODO: make no results card
        <p>No results</p>
      )}
    </>
  )
}

export default InPersonSearchResults;
