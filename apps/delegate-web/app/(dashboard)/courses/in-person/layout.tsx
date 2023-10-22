'use client'

import { Tabs, type Tab } from '@dentor/ui'
import { Container } from '@dentor/ui'
import { useParams, usePathname, useRouter } from 'next/navigation'
import { type PropsWithChildren, type FC, useState, useMemo } from 'react'

const inPersonCourseTabs: Tab[] = [
  { label: 'Discover Courses', id: 'discover', onClick: console.log },
  { label: 'My Courses', id: 'owned', onClick: console.log },
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