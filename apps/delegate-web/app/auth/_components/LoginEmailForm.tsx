'use client'

import generateOneTimePassword, { GenerateOneTimePasswordResponse, GenerateOneTimePasswordBody } from '@/api/auth/generate-one-time-password'
import { Button, ButtonVariant, EmailField, LoginNextIcon, useApiRequest, useToast } from '@dentor/ui'
import { type FC } from 'react'
import { useForm } from 'react-hook-form'

export interface LoginFormSuccessData {
  email?: string
  createdAt?: string
}

interface LoginEmailFormProps {
  heading?: string | JSX.Element
  subHeading?: string | JSX.Element
  onSuccess?: (data?: LoginFormSuccessData) => void
}

export interface EmailStepFormData {
  email: string
}

const LoginEmailForm: FC<LoginEmailFormProps> = ({
  heading = 'Welcome Back!',
  subHeading = 'To the ultimate education platform for dental professionals.',
  onSuccess
}) => {
  const { errorToast } = useToast()
  const { control, handleSubmit, setError, getValues, formState: { errors } } = useForm<EmailStepFormData>({ mode: 'onSubmit' })

  const { isLoading, sendApiRequest } = useApiRequest<GenerateOneTimePasswordResponse, GenerateOneTimePasswordBody>({
    request: generateOneTimePassword,
    onSuccess: (data) => {
      if (onSuccess) {
        onSuccess({
          email: getValues('email'),
          createdAt: data?.data?.createdAt
        })
      }
    },
    onError: (e) => {
      console.log("🚀 ~ file: LoginEmailForm.tsx:46 ~ e:", e)
      errorToast('Unable to login')
    },
    setFieldError: (name, { message }) => setError(name as any, { message })
  })

  return (
    <div className="w-full">
      <header className="mb-10">
        <LoginNextIcon className="text-neutral-900 mb-10" />
        <h1 className="text-neutral-900 font-bold text-4xl mb-2 font-body">{heading}</h1>
        <p className="text-base font-light text-neutral-900">{subHeading}</p>
      </header>

      <section className="w-full">
        <form onSubmit={handleSubmit(sendApiRequest)}>
          <EmailField
            control={control}
            error={errors?.email?.message}
          />

          <Button
            variant={ButtonVariant.Secondary}
            type="submit"
            className="mt-6"
            onClick={handleSubmit(sendApiRequest)}
            fluid
            loading={isLoading}
          >
            Continue
          </Button>
        </form>
      </section>
    </div>
  )
}

export default LoginEmailForm