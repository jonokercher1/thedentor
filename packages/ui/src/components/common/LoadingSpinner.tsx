import { AtomProps } from '@/types/Component'
import classNames from 'classnames'
import { type FC } from 'react'

enum LoadingSpinnerSize {
  Large = 'Large',
  Regular = 'Regular',
  Small = 'Small'
}

interface LoadingSpinnerProps extends AtomProps {
  size?: LoadingSpinnerSize
}

const LoadingSpinner: FC<LoadingSpinnerProps> = ({ id, className, size = LoadingSpinnerSize.Regular }) => {
  const spinnerClasses = classNames(
    className,
    'inline-block animate-spin rounded-full border-solid border-current border-r-transparent align-[-0.125em] motion-reduce:animate-[spin_1.5s_linear_infinite]',
    {
      'h-8 w-8 border-4': size === LoadingSpinnerSize.Large,
      'h-4 w-4 border-2': size === LoadingSpinnerSize.Regular,
      'h-3 w-3 border': size === LoadingSpinnerSize.Small,
    }
  )

  return (
    <div
      className={spinnerClasses}
      id={id}
      role="status"
    />
  )
}

export default LoadingSpinner