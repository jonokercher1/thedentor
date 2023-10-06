'use client'

import { Visibility, VisibilityOff, Key, ChevronLeft } from '@mui/icons-material'
import { memo, type FC } from 'react'

export enum IconName {
  Visibility,
  VisibilityOff,
  Key,
  ChevronLeft
}

interface IconProps {
  name: IconName
  className?: string
}

const icons = {
  [IconName.Visibility]: Visibility,
  [IconName.VisibilityOff]: VisibilityOff,
  [IconName.Key]: Key,
  [IconName.ChevronLeft]: ChevronLeft,
}

const Icon: FC<IconProps> = ({ name, className }) => {
  const IconComponent = icons[name]

  return <IconComponent className={className} />
}

export default memo(Icon)