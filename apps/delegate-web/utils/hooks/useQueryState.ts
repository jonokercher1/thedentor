import { useState } from 'react'

interface QueryState {
  isLoading: boolean
  isSuccess: boolean
  error?: string
}

interface UseQueryStateReturn {
  isLoading: boolean
  isSuccess: boolean
  error?: string
  queryLoading: () => void
  querySuccessful: () => void
  setQueryError: (queryError: string) => void
}

export const useQueryState = (): UseQueryStateReturn => {
  const [queryState, setQueryState] = useState<QueryState>({
    isLoading: false,
    isSuccess: false,
    error: undefined
  })

  const queryLoading = () => {
    setQueryState({
      isLoading: true,
      isSuccess: false,
      error: undefined
    })
  }

  const querySuccessful = () => {
    setQueryState({
      isLoading: false,
      isSuccess: true,
      error: undefined
    })
  }

  const setQueryError = (queryError: string) => {
    setQueryState({
      isLoading: false,
      isSuccess: false,
      error: queryError
    })
  }

  return {
    ...queryState,
    queryLoading,
    querySuccessful,
    setQueryError
  }
}