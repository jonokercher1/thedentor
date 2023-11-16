'use client'

import { Chip } from '@dentor/ui'
import classNames from 'classnames'
import { useRouter, useSearchParams } from 'next/navigation'
import { type FC, useMemo } from 'react'

enum OwnedCourseTab {
  Upcoming = 'upcoming',
  All = 'all',
  Past = 'past',
  Saved = 'saved',
}

interface OwnedCoursesHeaderProps { }

const ownedCoursesHeaderTabs = [
  { label: 'Upcoming Courses', value: OwnedCourseTab.Upcoming },
  { label: 'Past Courses', value: OwnedCourseTab.Past },
  { label: 'All Courses', value: OwnedCourseTab.All },
  { label: 'My List', value: OwnedCourseTab.Saved },
]

const OwnedCoursesHeader: FC<OwnedCoursesHeaderProps> = () => {
  const searchParams = useSearchParams()
  const currentTab = searchParams.get('tab') ?? OwnedCourseTab.All
  const router = useRouter()

  const activeTab = useMemo(() => currentTab, [currentTab])

  const onChangeTab = (tab: OwnedCourseTab) => {
    if (tab === OwnedCourseTab.All) {
      router.push('/courses/in-person/owned')
    } else {
      router.push(`/courses/in-person/owned?tab=${tab}`)
    }
  }

  return (
    <header className="flex gap-4 py-20">
      {ownedCoursesHeaderTabs.map((tab, index) => (
        <Chip
          key={`in-person-course-header-tab-${index}`}
          label={tab.label}
          className={classNames(
            'w-44',
            {
              'border-2 border-accent-primary': activeTab === tab.value
            }
          )}
          onClick={() => onChangeTab(tab.value)}
        />
      ))}
    </header>
  )
}

export default OwnedCoursesHeader