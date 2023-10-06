'use client'

import classNames from 'classnames'
import { useId, type ChangeEventHandler, type ForwardRefRenderFunction, forwardRef, ReactElement } from 'react'

interface CheckboxProps {
  label: string | ReactElement
  name?: string
  error?: string
  className?: string
  value: boolean
  onChange: ChangeEventHandler<HTMLInputElement>
}

const Checkbox: ForwardRefRenderFunction<HTMLInputElement, CheckboxProps> = ({ label, className, value, error, onChange }, ref) => {
  const inputId = useId()
  const containerClasses = classNames(className, 'relative font-body flex items-center justify-start gap-2')

  return (
    <div className={containerClasses}>
      <input
        ref={ref}
        type="checkbox"
        name={inputId}
        checked={value}
        onChange={onChange}
        className="border-2 rounded-lg border-neutral-300 p-3 outline-none inline-block"
      />

      <label
        className="font-medium uppercase text-sm block"
        htmlFor={inputId}
      >
        {label}
      </label>

      {error && (
        <p className="text-xs absolute block top-full pt-1 text-state-error font-bold">{error}</p>
      )}
    </div>
  )
}

export default forwardRef(Checkbox)