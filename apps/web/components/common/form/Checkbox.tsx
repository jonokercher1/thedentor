'use client'

import classNames from 'classnames'
import { useId, type ChangeEventHandler, type ForwardRefRenderFunction, forwardRef, ReactElement } from 'react'

interface CheckboxProps {
  label: string | ReactElement
  name?: string
  className?: string
  value: boolean
  onChange: ChangeEventHandler<HTMLInputElement>
}

const Checkbox: ForwardRefRenderFunction<HTMLInputElement, CheckboxProps> = ({ label, name, className, value, onChange }, ref) => {
  const inputId = name ?? useId()
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
    </div>
  )
}

export default forwardRef(Checkbox)