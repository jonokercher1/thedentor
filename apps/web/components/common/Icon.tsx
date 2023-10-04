import { Visibility, VisibilityOff } from '@mui/icons-material'
import { memo, type FC } from 'react'

export enum IconName {
  Visibility,
  VisibilityOff
}

interface IconProps {
  name: IconName
  className?: string
}

const icons = {
  [IconName.Visibility]: Visibility,
  [IconName.VisibilityOff]: VisibilityOff,
}

const Icon: FC<IconProps> = ({ name, className }) => {
  const IconComponent = icons[name]

  return <IconComponent className={className} />
}

export default memo(Icon)