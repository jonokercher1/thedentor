'use client'

import classNames from 'classnames'
import { useId, type ChangeEventHandler, type ForwardRefRenderFunction, forwardRef, ReactNode } from 'react'

export interface TextInputProps {
  label?: {
    value: string,
    error?: boolean
  }
  name?: string
  error?: string
  className?: string
  type?: 'text' | 'email'
  value: string
  onChange: ChangeEventHandler<HTMLInputElement>
  endSlot?: ReactNode
  placeholder?: string
}

const TextInput: ForwardRefRenderFunction<HTMLInputElement, TextInputProps> = ({
  label,
  error,
  className,
  value,
  onChange,
  endSlot,
  type = 'text',
  placeholder
}, ref) => {
  const inputId = useId()
  const containerClasses = classNames(className, 'relative font-body')
  const inputWrapperClasses = classNames('border-2 rounded-lg border-neutral-300 bg-white outline-none p-[2px] flex w-full')
  const inputClasses = classNames('flex-1 p-3 outline-none', {
    'border-state-error': error
  })
  const labelClasses = classNames('font-medium uppercase text-sm block mb-2', {
    'text-state-error': label?.error || error
  })

  return (
    <div className={containerClasses}>
      {label && (
        <label
          className={labelClasses}
          htmlFor={inputId}
        >
          {label.value}
        </label>
      )}

      <div className={inputWrapperClasses}>
        <input
          ref={ref}
          type={type}
          name={inputId}
          value={value}
          onChange={onChange}
          className={inputClasses}
          placeholder={placeholder}
        />

        {endSlot}
      </div>

      {error && (
        <p className="text-xs absolute block top-full pt-1 text-state-error font-bold capitalize">{error}</p>
      )}
    </div>
  )
}

export default forwardRef(TextInput)