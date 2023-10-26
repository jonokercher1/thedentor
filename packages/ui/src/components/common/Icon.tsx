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
  Facebook,
  ChevronRight,
  QrCodeScanner
} from '@mui/icons-material'
import { memo, type FC } from 'react'

export enum IconName {
  ChevronLeft,
  ChevronRight,
  EnvelopeOpen,
  Facebook,
  Instagram,
  Key,
  Lock,
  NotificationBell,
  Visibility,
  VisibilityOff,
  QrCode,
}

interface IconProps {
  name: IconName
  className?: string
}

const icons = {
  [IconName.ChevronLeft]: ChevronLeft,
  [IconName.ChevronRight]: ChevronRight,
  [IconName.EnvelopeOpen]: DraftsOutlined,
  [IconName.Facebook]: Facebook,
  [IconName.Instagram]: Instagram,
  [IconName.Key]: KeyOutlined,
  [IconName.Lock]: LockOutlined,
  [IconName.NotificationBell]: NotificationsNoneOutlined,
  [IconName.Visibility]: Visibility,
  [IconName.VisibilityOff]: VisibilityOff,
  [IconName.QrCode]: QrCodeScanner
}

const Icon: FC<IconProps> = ({ name, className }) => {
  const IconComponent = icons[name]

  return <IconComponent className={className} />
}

export default memo(Icon)