'use client'

import login, { type LoginBody, type LoginResponse } from '@/api/auth/login'
import LoginForm from '@/components/auth/LoginForm'
import { useApiRequest, useToast } from '@dentor/ui'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { type FC } from 'react'
import { LoginNextIcon } from '@dentor/ui'
import { useForm } from 'react-hook-form'

export interface LoginFormData {
  email: string
  password: string
  remember?: boolean
}

const Login: FC = () => {
  const router = useRouter()
  const { errorToast } = useToast()
  const { control, handleSubmit, setError, formState: { errors } } = useForm<LoginFormData>({ mode: 'onSubmit' })
  const { isLoading, sendApiRequest } = useApiRequest<LoginResponse, LoginBody>({
    request: login,
    onSuccess: () => router.push('/'),
    onError: () => errorToast('Unable to login'),
    setFieldError: (name, { message }) => setError(name as any, { message })
  })

  return (
    <div className="p-8 lg:p-20 w-full">
      <header className="mb-10">
        <LoginNextIcon className="text-neutral-900 mb-10" />
        <h1 className="text-neutral-900 font-bold text-4xl mb-2 font-body">Welcome Back!</h1>
        <p className="text-base font-light text-neutral-900">To the ultimate education platform for dental professionals.</p>
      </header>

      <section className="w-full">
        <LoginForm
          onSubmit={sendApiRequest}
          loading={isLoading}
          control={control}
          errors={errors}
          handleSubmit={handleSubmit}
        />

        <p className="text-neutral-900 text-center mt-6">Don't have an account? <Link href="/register" className="text-accent-secondary font-medium">Sign Up</Link></p>
      </section>
    </div>
  )
}

export default Login