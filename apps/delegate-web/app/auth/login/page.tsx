'use client'

import { type FC } from 'react'
import { useForm } from 'react-hook-form'
import { Button, ButtonVariant, EmailField, LoginNextIcon, useApiRequest, useToast } from '@dentor/ui'
import generateOneTimePassword, { GenerateOneTimePasswordResponse, GenerateOneTimePasswordBody } from '@/api/auth/generate-one-time-password'
import { useRouter } from 'next/navigation'

export interface EmailStepFormData {
  email: string
}

const Login: FC = () => {
  const router = useRouter()
  const { errorToast } = useToast()
  const { control, handleSubmit, setError, getValues, formState: { errors } } = useForm<EmailStepFormData>({ mode: 'onSubmit' })

  const { isLoading, sendApiRequest } = useApiRequest<GenerateOneTimePasswordResponse, GenerateOneTimePasswordBody>({
    request: generateOneTimePassword,
    onSuccess: (data) => router.push(`/auth/verify?email=${getValues('email')}&createdAt=${data?.data?.createdAt}`),
    onError: () => errorToast('Unable to login'),
    setFieldError: (name, { message }) => setError(name as any, { message })
  })

  return (
    <div className="w-full">
      <header className="mb-10">
        <LoginNextIcon className="text-neutral-900 mb-10" />
        <h1 className="text-neutral-900 font-bold text-4xl mb-2 font-body">Welcome Back!</h1>
        <p className="text-base font-light text-neutral-900">To the ultimate education platform for dental professionals.</p>
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

export default Login