'use client'

import {
  Visibility,
  VisibilityOff,
  KeyOutlined,
  ChevronLeft,
  DraftsOutlined,
  LockOutlined,
  NotificationsNoneOutlined,
  Instagram,
  Facebook
} from '@mui/icons-material'
import { memo, type FC } from 'react'

export enum IconName {
  Visibility,
  VisibilityOff,
  Key,
  ChevronLeft,
  EnvelopeOpen,
  Lock,
  NotificationBell,
  Instagram,
  Facebook
}

interface IconProps {
  name: IconName
  className?: string
}

const icons = {
  [IconName.Visibility]: Visibility,
  [IconName.VisibilityOff]: VisibilityOff,
  [IconName.Key]: KeyOutlined,
  [IconName.ChevronLeft]: ChevronLeft,
  [IconName.EnvelopeOpen]: DraftsOutlined,
  [IconName.Lock]: LockOutlined,
  [IconName.NotificationBell]: NotificationsNoneOutlined,
  [IconName.Instagram]: Instagram,
  [IconName.Facebook]: Facebook,
}

const Icon: FC<IconProps> = ({ name, className }) => {
  const IconComponent = icons[name]

  return <IconComponent className={className} />
}

export default memo(Icon)