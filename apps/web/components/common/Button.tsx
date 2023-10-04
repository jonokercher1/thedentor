'use client'

import { type FC } from 'react'
import classNames from 'classnames'
import LoadingSpinner from '@/components/common/LoadingSpinner'
import { AtomWithChildrenProps } from '@/types/Component'

export enum ButtonVariant {
  Primary = 'Primary',
  Secondary = 'Secondary',
}

interface ButtonProps extends AtomWithChildrenProps {
  onClick?: () => void
  variant?: ButtonVariant
  fluid?: boolean
  type?: HTMLButtonElement['type']
  loading?: boolean
}

const Button: FC<ButtonProps> = ({ onClick, children, id, className, fluid, type, loading, variant = ButtonVariant.Primary }) => {
  const buttonClasses = classNames(
    'bg-accent-primary text-neutral-100 rounded-full px-6 py-4 transition-colors duration-200',
    className,
    {
      'w-full': fluid,
      'bg-accent-primary text-neutral-700 hover:bg-accent-primary-dark': variant === ButtonVariant.Primary,
      'bg-accent-secondary hover:bg-accent-secondary-dark': variant === ButtonVariant.Secondary,
      'cursor-not-allowed': loading,
      // 'bg-accent-primary-light hover:bg-accent-primary-light': variant === ButtonVariant.Primary && loading,
      // 'bg-accent-secondary-light hover:bg-accent-secondary-light': variant === ButtonVariant.Secondary && loading,
    }
  )

  return (
    <button
      className={buttonClasses}
      onClick={onClick}
      type={type ?? 'button'}
      disabled={loading}
      id={id}
    >
      {children}
      {loading && (
        <LoadingSpinner className="ml-3" />
      )}
    </button>
  )
}

export default Button