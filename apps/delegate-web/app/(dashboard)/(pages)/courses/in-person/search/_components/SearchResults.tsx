'use client'

import { Course } from '@/types/api/course/course'
import { useState, type FC, useEffect } from 'react'
import CoursesGrid from '../../_components/CoursesGrid'
import useModifiableSearchParams from '@dentor/ui/hooks/useModifiableSearchParams'
import { useSearchParamsPagination } from '@dentor/ui'

interface InPersonSearchResultsProps {
  results: Course[]
  totalResults: number
  perPage: number
}

const InPersonSearchResults: FC<InPersonSearchResultsProps> = ({ results, totalResults, perPage }) => {
  const { onNextPage, moreToFetch } = useSearchParamsPagination(perPage, totalResults)

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
