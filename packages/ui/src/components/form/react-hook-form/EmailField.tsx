'use client'

import { type FC } from 'react'
import TextInput, { TextInputProps } from '../TextInput'
import { Controller, type Control } from 'react-hook-form'
import { useEmailValidator } from '../../../hooks/useEmailValidator'

interface EmailFieldProps extends Omit<TextInputProps, 'label' | 'value' | 'onChange'> {
  label?: TextInputProps['label']
  control: Control<any, any>,
  error?: string
}

const EmailField: FC<EmailFieldProps> = ({ control, error, label, ...inputProps }) => {
  const { validateEmail } = useEmailValidator()

  return (
    <Controller
      name="email"
      control={control}
      defaultValue=""
      rules={{
        required: {
          value: true,
          message: 'Email is required'
        },
        validate: (value) => {
          if (!validateEmail(value)) {
            return 'Email is invalid'
          }

          return undefined
        }
      }}
      render={({ field }) => (
        <TextInput
          {...inputProps}
          label={{
            value: label?.value ?? 'Email*',
            error: label?.error
          }}
          className="mb-7"
          type="email"
          error={error}
          {...field}
        />
      )}
    />
  )
}

export default EmailField