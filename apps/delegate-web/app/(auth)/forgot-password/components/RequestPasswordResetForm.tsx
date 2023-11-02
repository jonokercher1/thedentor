'use client'

import requestPasswordReset from '@/api/auth/request-password-reset'
import { ForgotPasswordFormData } from '@/app/(auth)/forgot-password/page'
import { Button, ButtonVariant, EmailField, Icon, IconName, useApiRequest, useToast } from '@dentor/ui'
import Link from 'next/link'
import { type FC } from 'react'
import { useForm } from 'react-hook-form'

interface RequestPasswordResetFormProps {
  onSuccess: () => void
}

const RequestPasswordResetForm: FC<RequestPasswordResetFormProps> = ({ onSuccess }) => {
  const { errorToast } = useToast()
  const { control, handleSubmit, setError, formState: { errors } } = useForm<ForgotPasswordFormData>({ mode: 'onSubmit' })
  const { isLoading, sendApiRequest } = useApiRequest<any, ForgotPasswordFormData>({
    request: requestPasswordReset,
    onSuccess,
    onError: () => errorToast('Error requesting password reset. Try again later.'),
    setFieldError: (name, { message }) => setError(name as any, { message })
  })

  const onSubmit = (data: ForgotPasswordFormData) => {
    sendApiRequest(data)
  }

  return (
    <div className="p-8 lg:p-20 w-full">
      <header className="mb-10">
        <Icon
          name={IconName.Key}
          className="w-10 h-10 mb-10"
        />

        <h1 className="text-neutral-900 font-bold text-4xl mb-2 font-body">Forgot Password</h1>
        <p className="text-base font-light text-neutral-900">No worries, we'll send you reset instructions.</p>
      </header>

      <section className="w-full">
        <form action="">
          <EmailField
            control={control}
            error={errors?.email?.message}
          />

          <Button
            variant={ButtonVariant.Secondary}
            type="submit"
            className="mt-6"
            onClick={handleSubmit(onSubmit)}
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

export default RequestPasswordResetForm