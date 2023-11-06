'use client'

import { AtomProps } from '@/types/Component'
import classNames from 'classnames'
import { type FC } from 'react'

interface ChipProps extends AtomProps {
  label: string
  onClick?: () => void
  leadingIcon?: JSX.Element
  trailingIcon?: JSX.Element
}

const Chip: FC<ChipProps> = ({ id, className, label, onClick, leadingIcon, trailingIcon }) => {
  const chipClasses = classNames(
    'flex items-center justify-between bg-neutral-600 py-2 px-3 gap-3 rounded-full cursor-default transition-colors duration-200',
    {
      ['!cursor-pointer hover:bg-opacity-80']: !!onClick
    },
    className
  )

  const onHandleClick = () => {
    if (onClick) {
      onClick()
    }
  }

  return (
    <span
      onClick={onHandleClick}
      tabIndex={0}
      className={chipClasses}
      id={id}
    >
      {leadingIcon}
      <p className="text-white mx-auto">{label}</p>
      {trailingIcon}
    </span>
  )
}

export default Chip