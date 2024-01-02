'use client'

import { type Tab, Tabs } from '@dentor/ui'
import { useParams, usePathname, useRouter, useSearchParams } from 'next/navigation'
import { type FC } from 'react'

interface DentorCoursesTabsProps { }

// This is duplicated as we need one on the server and one on the client
enum DentorCoursesTab {
  Courses = 'courses',
  Videos = 'videos',
}

const dentorCourseTabs: Tab[] = [
  { label: 'Courses', id: DentorCoursesTab.Courses },
  { label: 'Videos', id: DentorCoursesTab.Videos },
]

const DentorCoursesTabs: FC<DentorCoursesTabsProps> = () => {
  const router = useRouter()
  const pathname = usePathname()
  const searchParams = useSearchParams()
  const currentTab = searchParams.get('tab') ?? DentorCoursesTab.Courses

  const onChangeTab = (tab: DentorCoursesTab) => {
    if (tab === DentorCoursesTab.Courses) {
      router.push(pathname as any)
    } else {
      router.push(`${pathname}?tab=${tab}` as any)
    }
  }

  return (
    <header className="flex items-center mb-12 justify-center">
      <Tabs
        tabs={dentorCourseTabs}
        activeTabId={currentTab}
        onChange={(tabId: string) => onChangeTab(tabId as DentorCoursesTab)}
      />
    </header>
  )
}

export default DentorCoursesTabs