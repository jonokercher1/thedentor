import { AtomProps } from '@/types/component';
import classNames from 'classnames';
import { type FC } from 'react'

interface TheDentorPremiumCardProps extends AtomProps { }

const TheDentorPremiumCard: FC<TheDentorPremiumCardProps> = ({ id, className }) => {
  const containerClasses = classNames('flex flex-1 bg-neutral-700 items-center justify-center rounded-2xl', className)

  return (
    <div className={containerClasses} id={id}>
      {/* TODO: create advert for dentor premium that works horizontal and vertical */}
      <h2 className="text-white">The Dentor Premium</h2>
    </div>
  )
}

export default TheDentorPremiumCard