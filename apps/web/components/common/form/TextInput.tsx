'use client'

import classNames from 'classnames'
import { useId, type ChangeEventHandler, type ForwardRefRenderFunction, forwardRef } from 'react'

export interface TextInputProps {
  label: string
  name?: string
  error?: string
  className?: string
  type?: 'text' | 'email' | 'password'
  value: string
  onChange: ChangeEventHandler<HTMLInputElement>
}

const TextInput: ForwardRefRenderFunction<HTMLInputElement, TextInputProps> = ({ label, name, error, className, value, onChange, type = 'text' }, ref) => {
  const inputId = name ?? useId()
  const containerClasses = classNames(className, 'relative font-body')
  const inputClasses = classNames('border-2 rounded-lg border-neutral-300 p-3 outline-none block w-full', {
    'border-state-error': error
  })
  const labelClasses = classNames('font-medium uppercase text-sm block mb-2', {
    'text-state-error': error
  })

  return (
    <div className={containerClasses}>
      <label
        className={labelClasses}
        htmlFor={inputId}
      >
        {label}
      </label>

      <input
        ref={ref}
        type={type}
        name={inputId}
        value={value}
        onChange={onChange}
        className={inputClasses}
      />

      {error && (
        <p className="text-xs absolute block top-full pt-1 text-state-error font-bold">{error}</p>
      )}
    </div>
  )
}

export default forwardRef(TextInput)