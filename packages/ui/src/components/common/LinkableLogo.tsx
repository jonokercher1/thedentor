import Link from 'next/link'
import { type FC } from 'react'
import { Logo } from '../icons'
import { AtomProps } from '@/types/Component'
import classNames from 'classnames'

interface LinkableLogoProps extends AtomProps { }

const LinkableLogo: FC<LinkableLogoProps> = ({ id, className }) => {
  const classes = classNames('text-white absolute z-30', className)

  return (
    <Link href="/" id={id}>
      <Logo className={classes} />
    </Link>
  )
}

export default LinkableLogo