'use client'

import login, { type LoginResponse } from '@/api/auth/login'
import { Button, ButtonVariant, EmailField, Icon, IconName, OneTimePasscodeInput, PasswordField, useApiRequest, useToast } from '@dentor/ui'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { type FC } from 'react'
import { Controller, useForm } from 'react-hook-form'

export interface SetPasswordFormData {
  password: string
  passwordConfirmation: string
}

const SetPassword: FC = () => {
  const router = useRouter()
  const { errorToast } = useToast()
  const { control, handleSubmit, setError, watch, formState: { errors } } = useForm<SetPasswordFormData>({ mode: 'onSubmit' })
  const { isLoading, sendApiRequest } = useApiRequest<LoginResponse, SetPasswordFormData>({
    request: login,
    onSuccess: () => router.push('/'),
    onError: () => errorToast('Unable to login'),
    setFieldError: (name, { message }) => setError(name as any, { message })
  })

  const onSubmit = (data: SetPasswordFormData) => {
    console.log("🚀 ~ file: page.tsx:26 ~ onSubmit ~ data:", data)
    // sendApiRequest(data)
  }

  return (
    <div className="p-8 lg:p-20 w-full">
      <header className="mb-10">
        <Icon
          name={IconName.Lock}
          className="w-10 h-10 mb-10"
        />

        <h1 className="text-neutral-900 font-bold text-4xl mb-2 font-body">Set New Password</h1>
        <p className="text-base font-light text-neutral-900">At least 8 characters, uppercase, lowercase, numbers.</p>
      </header>

      <section className="w-full">
        <form action="" onSubmit={handleSubmit(onSubmit)}>
          <PasswordField
            control={control}
            error={errors.password?.message}
            showStrength
          />

          <PasswordField
            name="passwordConfirmation"
            control={control}
            error={errors.passwordConfirmation?.message}
            label={{ value: 'Confirm Password*' }}
          />

          <Button
            variant={ButtonVariant.Secondary}
            type="submit"
            className="mt-6"
            fluid
            loading={isLoading}
          >
            Reset Password
          </Button>
        </form>

        <Link href="/login" className="text-accent-secondary">
          <div className="mt-12 flex items-center justify-center">
            <Icon
              name={IconName.ChevronLeft}
              className="w-10 h-10 text-accent-secondary"
            />
            <p className="text-center font-medium">Back to Login</p>
          </div>
        </Link>
      </section>
    </div>
  )
}

export default SetPassword