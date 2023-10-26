import { AtomProps } from '@/types/component'
import { Chip } from '@dentor/ui'
import classNames from 'classnames'
import { type FC } from 'react'

interface DentorChipProps extends AtomProps {
  dentor: any // TODO Get from APi
  expanded?: boolean
}

const DentorChip: FC<DentorChipProps> = ({ dentor, expanded }) => {
  const chipClasses = classNames({ 'py-3 px-4': expanded })

  const iconClasses = classNames('h-6 w-6 bg-neutral-100 rounded-full', { 'h-10 w-10': expanded })

  return (
    <Chip
      leadingIcon={( // TODO: replace with gravatar of name?
        <div className={iconClasses} />
      )}
      label={dentor.name}
      className={chipClasses}
    />
  )
}

export default DentorChip