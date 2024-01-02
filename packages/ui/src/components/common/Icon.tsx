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
  QrCodeScanner,
  Star,
  Search,
  ExpandMore,
  CalendarMonth,
  LocationOnOutlined,
  Tune,
  ImportExport,
  Check,
  CreditScore,
  CheckCircleOutline,
  Error,
  PersonOutline,
  VerifiedUser,
} from '@mui/icons-material'
import { memo, type FC } from 'react'

export enum IconName {
  ChevronLeft,
  ChevronRight,
  ChevronDown,
  EnvelopeOpen,
  Facebook,
  Instagram,
  Key,
  Lock,
  NotificationBell,
  Visibility,
  VisibilityOff,
  QrCode,
  Star,
  Search,
  Calendar,
  Location,
  Filters,
  Reorder,
  Tick,
  PaymentApproved,
  CircleCheck,
  Error,
  User,
  VerifiedUser,
}

interface IconProps {
  name: IconName
  className?: string
}

const icons = {
  [IconName.ChevronLeft]: ChevronLeft,
  [IconName.ChevronRight]: ChevronRight,
  [IconName.ChevronDown]: ExpandMore,
  [IconName.EnvelopeOpen]: DraftsOutlined,
  [IconName.Facebook]: Facebook,
  [IconName.Instagram]: Instagram,
  [IconName.Key]: KeyOutlined,
  [IconName.Lock]: LockOutlined,
  [IconName.NotificationBell]: NotificationsNoneOutlined,
  [IconName.Visibility]: Visibility,
  [IconName.VisibilityOff]: VisibilityOff,
  [IconName.QrCode]: QrCodeScanner,
  [IconName.Star]: Star,
  [IconName.Search]: Search,
  [IconName.Calendar]: CalendarMonth,
  [IconName.Location]: LocationOnOutlined,
  [IconName.Filters]: Tune,
  [IconName.Reorder]: ImportExport,
  [IconName.Tick]: Check,
  [IconName.PaymentApproved]: CreditScore,
  [IconName.CircleCheck]: CheckCircleOutline,
  [IconName.Error]: Error,
  [IconName.User]: PersonOutline,
  [IconName.VerifiedUser]: VerifiedUser
}

const Icon: FC<IconProps> = ({ name, className }) => {
  const IconComponent = icons[name]

  return <IconComponent className={className} />
}

export default memo(Icon)