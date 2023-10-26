'use client'

import { AtomProps } from '@/types/Component'
import classNames from 'classnames'
import { type FC } from 'react'

export interface Tab {
  id: string
  label: string
}

interface TabsProps extends AtomProps {
  tabs: Tab[]
  activeTabId: string
  onChange: (tabId: string) => void
}

const Tabs: FC<TabsProps> = ({ tabs, activeTabId, onChange, className, id }) => {
  const tabClasses = classNames('bg-neutral-800 inline-grid grid-cols-2 rounded-3xl', className)

  return (
    <div className={tabClasses} id={id}>
      {tabs.map((tab, index) => (
        <button
          key={`tabs-tab-${index}`}
          onClick={() => onChange(tab.id)}
          className={
            classNames(
              'py-3 px-10 rounded-3xl',
              {
                ['bg-neutral-700']: tab.id === activeTabId
              }
            )
          }
        >
          <p className="text-white">{tab.label}</p>
        </button>
      ))}
    </div>
  )
}

export default Tabs