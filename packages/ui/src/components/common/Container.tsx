import { type AtomWithChildrenProps } from '@/types/Component'
import classNames from 'classnames'
import { type FC } from 'react'

interface ContainerProps extends AtomWithChildrenProps {
  className?: string
}

// TODO: be nice to introduce a renderer here to override the parent tag
const Container: FC<ContainerProps> = ({ children, className }) => {
  const containerClasses = classNames('max-w-[1600px] mx-auto px-6', className)

  return (
    <div className={containerClasses}>
      {children}
    </div>
  )
}

export default Container