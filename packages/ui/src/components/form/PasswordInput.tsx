'use client'

import classNames from 'classnames'
import { type ChangeEventHandler, type ForwardRefRenderFunction, forwardRef, useState } from 'react'
import TextInput from './TextInput'
import { passwordStrength as checkPasswordStrength } from 'check-password-strength'
import Icon, { IconName } from '../common/Icon'

interface PasswordInputProps {
  label?: string
  name?: string
  error?: string
  className?: string
  value: string
  onChange: ChangeEventHandler<HTMLInputElement>
  showStrength?: boolean
}

const PasswordInput: ForwardRefRenderFunction<HTMLInputElement, PasswordInputProps> = ({ showStrength, className, label = 'Password*', ...inputProps }, ref) => {
  const [passwordStrength, setPasswordStrength] = useState<number>()
  const [visible, setVisible] = useState(false)

  const containerClasses = classNames(className, 'relative font-body')
  const strengthIndicatorClasses = 'h-1 bg-neutral-300 rounded-full w-full block lg:h-2'
  const firstStrengthIndicatorClasses = classNames(strengthIndicatorClasses, { '!bg-state-success': passwordStrength !== undefined && passwordStrength >= 0 })
  const secondStrengthIndicatorClasses = classNames(strengthIndicatorClasses, { '!bg-state-success': passwordStrength && passwordStrength >= 1 })
  const thirdStrengthIndicatorClasses = classNames(strengthIndicatorClasses, { '!bg-state-success': passwordStrength && passwordStrength >= 2 })
  const fourthStrengthIndicatorClasses = classNames(strengthIndicatorClasses, { '!bg-state-success': passwordStrength && passwordStrength >= 3 })

  const onChange: ChangeEventHandler<HTMLInputElement> = (e) => {
    inputProps.onChange(e)

    if (showStrength) {
      const value = e.target.value
      const strength = value.length ? checkPasswordStrength(e.target.value).id : undefined
      setPasswordStrength(strength)
    }
  }

  const onToggleVisibility = () => {
    setVisible(!visible)
  }

  return (
    <div className={containerClasses}>
      <TextInput
        {...inputProps}
        ref={ref}
        label={label}
        onChange={onChange}
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