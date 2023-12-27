'use client'

import { type FC } from 'react'
import { Controller, useForm } from 'react-hook-form'
import { Button, ButtonVariant, Icon, IconName, OneTimePasscodeInput, useApiRequest, useToast } from '@dentor/ui'
import loginWithOneTimePassword, { LoginWithOneTimePasswordBody, LoginWithOneTimePasswordResponse } from '@/api/auth/login-with-one-time-password'
import { redirect, useRouter, useSearchParams } from 'next/navigation'
import dayjs from 'dayjs'
import useCountdownTimer from '@dentor/ui/hooks/useCountdownTimer'
import generateOneTimePassword, { GenerateOneTimePasswordBody, GenerateOneTimePasswordResponse } from '@/api/auth/generate-one-time-password'
import { CurrentUser } from '@/types/api/auth/current-user'

interface LoginOneTimePasswordFormProps {
  heading?: string | JSX.Element
  subHeading?: JSX.Element
  onSuccess?: (data: CurrentUser) => void
  onMissingEmail?: () => void
}

export interface LoginOneTimePasswordFormData {
  oneTimePassword: string[]
}

const LoginOneTimePasswordForm: FC<LoginOneTimePasswordFormProps> = ({ heading = 'Enter Your One Time Password', subHeading, onSuccess, onMissingEmail }) => {
  const router = useRouter()
  const searchParams = useSearchParams()

  const email = searchParams.get('email')
  const createdAt = searchParams.get('createdAt')

  const timeToResend = useCountdownTimer(dayjs(createdAt).add(1, 'minute'))

  const { errorToast, successToast } = useToast()
  const { control, handleSubmit, setError, formState: { errors } } = useForm<LoginOneTimePasswordFormData>({ mode: 'onSubmit' })

  const { isLoading: loginLoading, sendApiRequest: triggerLogin } = useApiRequest<LoginWithOneTimePasswordResponse, LoginWithOneTimePasswordBody>({
    request: loginWithOneTimePassword,
    onSuccess: (data) => {
      if (onSuccess) {
        onSuccess(data?.data!)
      }
    },
    onError: () => errorToast('Invalid one time password. Please try again.'),
    setFieldError: (name, { message }) => setError(name as any, { message })
  })

  const { isLoading: requestOneTimePasswordLoading, sendApiRequest: requestOneTimePassword } = useApiRequest<GenerateOneTimePasswordResponse, GenerateOneTimePasswordBody>({
    request: generateOneTimePassword,
    onSuccess: (data) => {
      successToast('New one time password requested')
      router.push(`/auth/verify?email=${email}&createdAt=${data?.data?.createdAt}`)
    },
    onError: () => errorToast('Unable to request new one time password. Try Again.'),
    setFieldError: (name, { message }) => setError(name as any, { message })
  })

  const onHandleSubmit = (data: LoginOneTimePasswordFormData) => {
    const requestBody: LoginWithOneTimePasswordBody = {
      email: email!, // no email case is handled below
      oneTimePassword: data.oneTimePassword.join(''),
    }

    return triggerLogin(requestBody)
  }

  const onPasswordEntered = (password: string[]) => {
    onHandleSubmit({ oneTimePassword: password })
  }

  const onResendOneTimePassword = () => {
    if (timeToResend > 0) {
      return;
    }

    requestOneTimePassword({ email: email! }) // no email case is handled below
  }

  if (!email) {
    if (onMissingEmail) {
      onMissingEmail()
    } else {
      redirect('/auth/login')
    }
  }

  return (
    <div className="w-full">
      <header className="mb-10">
        <Icon name={IconName.Lock} className="w-10 h-10 mb-10" />
        <h1 className="text-neutral-900 font-bold text-4xl mb-2 font-body">{heading}</h1>
        {subHeading ? subHeading : (
          <>
            <p className="text-base font-light text-neutral-900">
              We have sent a one time password to <strong>{email}</strong>.
              <br />
            </p>

            <p className="text-base font-light text-neutral-900">
              Didn't receive it?&nbsp;
              {timeToResend === 0 ? (
                <button onClick={onResendOneTimePassword} disabled={requestOneTimePasswordLoading}>
                  <strong className="text-accent-secondary">Resend email.</strong>
                </button>
              ) : (
                <p className="inline-block">Resend in <strong className="text-accent-secondary">{Math.floor(timeToResend / 1000)}s</strong></p>
              )}
            </p>
          </>
        )}
      </header>

      <section className="w-full">
        <form onSubmit={handleSubmit(onHandleSubmit)}>
          <Controller
            name="oneTimePassword"
            control={control}
            render={({ field }) => (
              <OneTimePasscodeInput
                value={field.value}
                onChange={field.onChange}
                onPasswordEntered={e => onPasswordEntered(e)}
                error={errors.oneTimePassword?.message}
              />
            )}
          />

          <footer>
            <Button
              variant={ButtonVariant.Secondary}
              type="submit"
              className="mt-6"
              onClick={handleSubmit(onHandleSubmit)}
              fluid
              loading={loginLoading}
            >
              Login
            </Button>
          </footer>
        </form>
      </section>
    </div>
  )
}

export default LoginOneTimePasswordForm