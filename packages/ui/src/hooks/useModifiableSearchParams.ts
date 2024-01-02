import { usePathname, useRouter, useSearchParams } from 'next/navigation'
import { useMemo } from 'react'

interface RouterPushOptions {
  scroll?: boolean
}

const useModifiableSearchParams = () => {
  const searchParams = useSearchParams()
  const pathname = usePathname()
  const router = useRouter()

  const params = useMemo(() => new URLSearchParams(searchParams as any), [searchParams])

  const persistStateToUrl = (options?: RouterPushOptions) => {
    const url = `${pathname}?${params.toString()}`
    router.push(url as any, options)
  }

  const set = (key: string, value?: string) => {
    if (value) {
      params.set(key, value)
    } else {
      params.delete(key)
    }
  }

  const get = (key: string): string | null => {
    return searchParams.get(key)
  }

  return {
    get,
    set,
    persistStateToUrl
  }
}

export default useModifiableSearchParams;