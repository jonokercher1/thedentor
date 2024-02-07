'use client'

import { AtomWithChildrenProps } from '@/types/component'
import { useRef, type FC, useState } from 'react'
import { useOnClickOutside } from 'usehooks-ts'
import Chip from './Chip'
import Icon, { IconName } from './Icon'
import classNames from 'classnames'

// TOOD: rename this
interface DropdownProps extends AtomWithChildrenProps {
  leadingIcon?: JSX.Element
  label: string
  chipClasses?: string
  open: boolean
  setOpen: (value: boolean) => void
}

const Dropdown: FC<DropdownProps> = ({ label, leadingIcon, children, id, className, chipClasses, open, setOpen }) => {
  const parentClasses = classNames('relative flex flex-col items-center', className)
  const parentRef = useRef<HTMLDivElement>(null)

  const onClose = () => {
    setOpen(false)
  }

  const onTogglePopover = () => {
    setOpen(!open)
  }

  useOnClickOutside(parentRef, onClose)

  return (
    <div
      ref={parentRef}
      className={parentClasses}
      id={id}
    >
      <Chip
        label={label}
        onClick={onTogglePopover}
        leadingIcon={leadingIcon}
        className={chipClasses}
        trailingIcon={(
          <Icon
            name={IconName.ChevronDown}
            className="text-white"
          />
        )}
      />

      {open && (
        <div className="bg-white rounded-2xl absolute p-4 top-full mt-4 z-30">
          {children}
        </div>
      )}
    </div>
  )
}

export default Dropdown 