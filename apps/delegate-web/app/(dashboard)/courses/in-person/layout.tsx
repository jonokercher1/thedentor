'use client'

import { Tabs, type Tab } from '@dentor/ui'
import { Container } from '@dentor/ui'
import { usePathname, useRouter } from 'next/navigation'
import { type PropsWithChildren, type FC, useMemo } from 'react'

const inPersonCourseTabs: Tab[] = [
  { label: 'Discover Courses', id: 'discover' },
  { label: 'My Courses', id: 'owned' },
]

const InPersonCoursesLayout: FC<PropsWithChildren> = ({ children }) => {
  const pathname = usePathname()
  const router = useRouter()
  const activeTabId = useMemo(() => pathname.replace('/courses/in-person/', ''), [pathname])

  const onChangeTab = (tabId: string) => {
    router.push(`/courses/in-person/${tabId}` as any)
  }

  return (
    <Container>
      {/* TODO: hide this on individual course page */}
      <section className="text-center">
        <Tabs
          tabs={inPersonCourseTabs}
          activeTabId={activeTabId}
          onChange={onChangeTab}
        />

        {/* Search */}
      </section>

      {children}
    </Container>
  )
}

export default InPersonCoursesLayout