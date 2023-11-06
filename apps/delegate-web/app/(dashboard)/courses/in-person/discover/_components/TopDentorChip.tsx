'use client'

import { type Dentor } from '@/types/api/dentor/dentor'
import { AtomProps } from '@/types/component'
import { Icon, IconName } from '@dentor/ui'
import classNames from 'classnames'
import Link from 'next/link'
import { type FC } from 'react'

interface TopDentorChipProps extends AtomProps {
  dentor: Dentor
}

const TopDentorChip: FC<TopDentorChipProps> = ({ dentor, className }) => {
  const containerClasses = classNames(
    'bg-neutral-500 flex items-center gap-4 p-3 rounded-full transition-colors duration-200 hover:bg-opacity-80',
    className
  )

  const url = `/dentors/${dentor.id}`;

  return (
    <Link href={url as any}>
      <span className={containerClasses}>
        {/* avatar */}
        <div
          className="h-24 w-24 rounded-full bg-neutral-300"
        />

        <div>
          <h4 className="font-bold text-white text-xl">{dentor.name}</h4>
          <span className="flex items-center gap-2">
            <Icon
              name={IconName.Star}
              className="text-accent-secondary"
            />
            <p className="font-light text-neutral-300">24 Reviews</p>
          </span>
        </div>

        <Icon
          name={IconName.ChevronRight}
          className="text-white ml-auto"
        />
      </span>
    </Link>
  )
}

export default TopDentorChip