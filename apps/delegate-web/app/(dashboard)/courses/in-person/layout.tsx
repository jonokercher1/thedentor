'use client'

import { Tabs, type Tab } from '@dentor/ui'
import { Container } from '@dentor/ui'
import { usePathname, useRouter, useSearchParams } from 'next/navigation'
import { type PropsWithChildren, type FC, useMemo, useState, useEffect } from 'react'
import { useDebounce } from 'usehooks-ts'
import SearchHeader from './search/_components/SearchHeader'

const inPersonCourseTabs: Tab[] = [
  { label: 'Discover Courses', id: 'discover' },
  { label: 'My Courses', id: 'owned' },
]

const searchPathname = '/courses/in-person/search'

const routesToShowTabs = [
  '/courses/in-person/discover',
  '/courses/in-person/owned',
  searchPathname,
]

const InPersonCoursesLayout: FC<PropsWithChildren> = ({ children }) => {
  const searchParams = useSearchParams()
  const pathname = usePathname()
  const router = useRouter()

  const [search, setSearch] = useState<string>(searchParams.get('term') ?? '')

  const debouncedSearch = useDebounce(search, 300)

  const activeTabId = useMemo(() => pathname.replace('/courses/in-person/', ''), [pathname])
  const showTabs = useMemo(() => routesToShowTabs.includes(pathname), [pathname])

  const onChangeTab = (tabId: string) => {
    router.push(`/courses/in-person/${tabId}` as any)
  }

  useEffect(() => {
    if (pathname === searchPathname) {
      // TODO: maintain other query params 

      router.replace(`/courses/in-person/search?term=${debouncedSearch}`)
    }
  }, [debouncedSearch])

  return (
    <main>
      {showTabs && (
        <Container>
          <section className="text-center flex items-center justify-center gap-4 relative">
            <Tabs
              tabs={inPersonCourseTabs}
              activeTabId={activeTabId}
              onChange={onChangeTab}
            />

            <SearchHeader
              setSearch={setSearch}
              search={search}
              searchPathname={searchPathname}
            />
          </section>
        </Container>
      )}

      {children}
    </main>
  )
}

export default InPersonCoursesLayout