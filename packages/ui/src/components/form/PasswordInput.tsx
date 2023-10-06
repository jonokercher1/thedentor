'use client'

import classNames from 'classnames'
import { type ChangeEventHandler, type ForwardRefRenderFunction, forwardRef, useState } from 'react'
import TextInput from './TextInput'
import Icon, { IconName } from '../common/Icon'
import { usePasswordStrength } from '../../hooks/usePasswordStrength'

interface PasswordInputProps {
  label?: string
  name?: string
  error?: string
  className?: string
  value: string
  onChange: ChangeEventHandler<HTMLInputElement>
  showStrength?: boolean
}

const PasswordInput: ForwardRefRenderFunction<HTMLInputElement, PasswordInputProps> = ({ showStrength, className, label = 'Password*', error, ...inputProps }, ref) => {
  const [visible, setVisible] = useState(false)
  const { strength: passwordStrength } = usePasswordStrength(inputProps.value)

  const containerClasses = classNames(className, 'relative font-body')
  const strengthIndicatorClasses = 'h-1 bg-neutral-300 rounded-full w-full block lg:h-2'
  const firstStrengthIndicatorClasses = classNames(
    strengthIndicatorClasses,
    { '!bg-state-success': passwordStrength !== undefined && passwordStrength > 0 },
    { '!bg-state-error': error },
  )
  const secondStrengthIndicatorClasses = classNames(
    strengthIndicatorClasses,
    { '!bg-state-success': passwordStrength && passwordStrength >= 2 },
    { '!bg-state-error': error },
  )
  const thirdStrengthIndicatorClasses = classNames(
    strengthIndicatorClasses,
    { '!bg-state-success': passwordStrength && passwordStrength >= 3 },
    { '!bg-state-error': error },
  )
  const fourthStrengthIndicatorClasses = classNames(
    strengthIndicatorClasses,
    { '!bg-state-success': passwordStrength && passwordStrength >= 4 },
    { '!bg-state-error': error },
  )

  const onToggleVisibility = () => {
    setVisible(!visible)
  }

  return (
    <div className={containerClasses}>
      <TextInput
        {...inputProps}
        ref={ref}
        error={showStrength ? undefined : error}
        label={{
          value: label,
          error: !!error,
        }}
        type={visible ? 'text' : 'password'}
        endSlot={(
          <button type="button" onClick={onToggleVisibility}>
            <Icon
              name={visible ? IconName.VisibilityOff : IconName.Visibility}
              className="h-5 w-5 mx-2"
            />
          </button>
        )}
      />

      {showStrength && (
        <div className="w-full flex items-center justify-between gap-4 lg:gap-6 my-4">
          <span className={firstStrengthIndicatorClasses} />
          <span className={secondStrengthIndicatorClasses} />
          <span className={thirdStrengthIndicatorClasses} />
          <span className={fourthStrengthIndicatorClasses} />
        </div>
      )}
    </div>
  )
}

export default forwardRef(PasswordInput)