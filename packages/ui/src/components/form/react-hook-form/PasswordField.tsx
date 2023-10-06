'use client'

import { type FC } from 'react'
import { TextInputProps } from '../TextInput'
import { Controller, type Control } from 'react-hook-form'
import PasswordInput from '../PasswordInput'

interface PasswordFieldProps extends Omit<TextInputProps, 'label' | 'value' | 'onChange'> {
  label?: TextInputProps['label']
  control: Control<any, any>
  error?: string
  showStrength?: boolean
}

const PasswordField: FC<PasswordFieldProps> = ({ control, error, label, showStrength, ...inputProps }) => {
  return (
    <Controller
      name="password"
      defaultValue=""
      control={control}
      rules={{
        required: {
          value: true,
          message: 'Password is required'
        },
        minLength: {
          value: 8,
          message: 'Password must be at least 8 characters'
        }
      }}
      render={({ field }) => (
        <PasswordInput
          {...inputProps}
          className="mb-5"
          {...field}
          error={error}
          showStrength={showStrength}
        />
      )}
    />
  )
}

export default PasswordField