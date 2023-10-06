import { type FC } from 'react'
import { Controller, useFormContext } from 'react-hook-form'
import { RegisterFormData } from '@/app/(auth)/register/page'
import { Checkbox, PasswordInput, PadlockIcon } from '@dentor/ui'
import Link from 'next/link'

interface RegisterPasswordFormProps { }

const RegisterPasswordForm: FC<RegisterPasswordFormProps> = () => {
  const { control, watch, formState: { errors } } = useFormContext<RegisterFormData>()
  const password = watch('password')

  return (
    <div>
      <header className="mb-10">
        <PadlockIcon className="text-neutral-900 mb-10" />
        <h1 className="text-neutral-900 font-bold text-4xl mb-2 font-body">Create Password</h1>
        <p className="text-base font-light text-neutral-900">At least 8 characters, uppercase, lowercase, numbers.</p>
      </header>

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
            className="mb-5"
            showStrength
            {...field}
            error={errors.password?.message}
          />
        )}
      />
      <Controller
        name="passwordConfirmation"
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
          },
          validate: (value: string) => {
            if (value !== password) {
              return 'Passwords don\'t match'
            }
          }
        }}
        render={({ field }) => (
          <PasswordInput
            label="Confirm Password*"
            className="mb-5"
            {...field}
            error={errors.passwordConfirmation?.message}
          />
        )}
      />
      <Controller
        name="termsAndConditions"
        control={control}
        rules={{
          required: {
            value: true,
            message: 'You must accept the terms & conditions'
          }
        }}
        render={({ field }) => (
          <Checkbox
            label={
              <p className="text-neutral-900">
                I Agree to The <Link href="/" className="text-accent-secondary">Terms & Conditions</Link> and <Link href="/" className="text-accent-secondary">Privacy Policy</Link>
              </p>
            }
            className="pt-6 mb-6"
            {...field}
            value={field.value ?? false}
            error={errors.termsAndConditions?.message}
          />
        )}
      />
    </div>
  )
}

export default RegisterPasswordForm