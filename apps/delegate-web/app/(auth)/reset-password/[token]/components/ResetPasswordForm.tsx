'use client'

import resetPassword from '@/api/auth/reset-password'
import { Button, ButtonVariant, Icon, IconName, PasswordField, PasswordInput, useApiRequest, useToast } from '@dentor/ui'
import Link from 'next/link'
import { useParams, useRouter } from 'next/navigation'
import { type FC } from 'react'
import { Controller, useForm } from 'react-hook-form'

interface ResetPasswordFormProps { }

interface ResetPasswordFormData {
  token: string
  password: string
  passwordConfirmation: string
}

const ResetPasswordForm: FC<ResetPasswordFormProps> = () => {
  const params = useParams()
  const router = useRouter()
  const { errorToast } = useToast()
  const { control, handleSubmit, setError, watch, formState: { errors } } = useForm<ResetPasswordFormData>({ mode: 'onSubmit' })
  const { isLoading, sendApiRequest } = useApiRequest<any, ResetPasswordFormData>({
    request: (body) => resetPassword(body!), // TODO: workout how to fix sometimes optional body
    onSuccess: () => router.push('/login'), // TODO: add success toast query param
    onError: () => errorToast('Error resetting password'),
    setFieldError: (name, { message }) => setError(name as any, { message })
  })

  const password = watch('password')

  const onSubmit = (data: Pick<ResetPasswordFormData, 'password' | 'passwordConfirmation'>) => {
    const token = params.token as string

    sendApiRequest({
      ...data,
      token,
    })
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

export default ResetPasswordForm