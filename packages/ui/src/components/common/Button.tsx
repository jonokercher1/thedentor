'use client'

import { type FC } from 'react'
import classNames from 'classnames'
import LoadingSpinner from './LoadingSpinner'
import { AtomWithChildrenProps } from '../../types/Component'
import Link from 'next/link'

export enum ButtonVariant {
  Primary = 'Primary',
  Secondary = 'Secondary',
  Tertiary = 'Tertiary'
}

interface ButtonProps extends AtomWithChildrenProps {
  onClick?: () => void
  variant?: ButtonVariant
  fluid?: boolean
  type?: HTMLButtonElement['type']
  loading?: boolean
  disabled?: boolean
  outlined?: boolean
  href?: string
}

const Button: FC<ButtonProps> = ({ onClick, children, id, className, fluid, type, disabled, loading, outlined, href, variant = ButtonVariant.Primary }) => {
  const isDisabled = disabled || loading
  const buttonClasses = classNames(
    'bg-accent-primary text-neutral-100 rounded-full px-6 py-4 transition-colors duration-200',
    className,
    {
      'w-full': fluid,
      'bg-accent-primary text-neutral-700 hover:bg-accent-primary-dark': variant === ButtonVariant.Primary,
      'bg-accent-secondary hover:bg-accent-secondary-dark': variant === ButtonVariant.Secondary,
      'bg-opacity-50 cursor-not-allowed hover:bg-opacity-50': isDisabled,
      'hover:bg-accent-primary hover:bg-opacity-50': isDisabled && variant === ButtonVariant.Primary,
      'hover:bg-accent-secondary hover:bg-opacity-50': isDisabled && variant === ButtonVariant.Secondary,
      'border-accent-primary border-2 bg-transparent text-white hover:bg-accent-primary box-border': outlined && variant === ButtonVariant.Primary,
      'border-accent-secondary border-2 bg-transparent hover:bg-accent-secondary box-border': outlined && variant === ButtonVariant.Secondary,
      'bg-neutral-700 text-white hover:bg-opacity-50': variant === ButtonVariant.Tertiary
    }
  )

  const ButtonInner = () => (
    <>
      {children}
      {loading && (
        <LoadingSpinner className="ml-3" />
      )}
    </>
  )

  if (href) {
    return (
      <Link
        href={href}
        id={id}
        className={buttonClasses}
      >
        <ButtonInner />
      </Link>
    )
  }

  return (
    <button
      className={buttonClasses}
      onClick={onClick}
      type={type ?? 'button'}
      disabled={isDisabled}
      id={id}
    >
      <ButtonInner />
    </button>
  )
}

export default Button