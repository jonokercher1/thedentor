'use client'

import { useCallback, useEffect, useState } from 'react'
import useModifiableSearchParams from './useModifiableSearchParams'

export const useSearchParamsPagination = (perPage: number, totalResults: number) => {
  console.log("🚀 ~ file: useSearchParamsPagination.ts:7 ~ useSearchParamsPagination ~ totalResults:", totalResults)
  const searchParams = useModifiableSearchParams()
  const defaultPageNumber = searchParams.get('page') ? Number(searchParams.get('page')) : 1

  const [page, setPage] = useState<number>(defaultPageNumber)
  console.log("🚀 ~ file: useSearchParamsPagination.ts:11 ~ useSearchParamsPagination ~ page:", page)
  console.log("🚀 ~ file: useSearchParamsPagination.ts:7 ~ useSearchParamsPagination ~ total:", perPage * page)

  const moreToFetch = (page * perPage) < totalResults
  console.log("🚀 ~ file: useSearchParamsPagination.ts:13 ~ useSearchParamsPagination ~ moreToFetch:", moreToFetch)

  const onFetchMore = useCallback(() => {
    searchParams.set('page', page.toString())
    searchParams.persistStateToUrl({ scroll: false })
  }, [page, searchParams]);

  const onNextPage = () => {
    setPage(page + 1)
  }

  useEffect(() => {
    if (page !== 1) {
      onFetchMore()
    }
  }, [page, onFetchMore])

  return {
    page,
    moreToFetch,
    onNextPage
  }
}