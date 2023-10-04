'use client'

import login from '@/api/auth/login'
import LoginForm from '@/components/auth/LoginForm'
import LoginNextIcon from '@/components/common/icons/LoginNextIcon'
import { useQueryState } from '@/utils/hooks/useQueryState'
import { errorToast } from '@/utils/toast'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { type FC } from 'react'

export interface LoginFormData {
  email: string
  password: string
  remember?: boolean
}

const Login: FC = () => {
  const router = useRouter()
  const { isLoading, setQueryError, queryLoading, querySuccessful } = useQueryState()

  const onSubmit = async (data: LoginFormData) => {
    try {
      queryLoading()
      const response = await login(data)

      if (response.statusCode > 299) {
        throw new Error('Error logging in')
      }

      querySuccessful()
      router.push('/')
    } catch (e: any) {
      setQueryError(e.message)
      errorToast('Unable to login')
    }
  }

  return (
    <div className="p-8 lg:p-20 w-full">
      <header className="mb-10">
        <LoginNextIcon className="text-neutral-900 mb-10" />
        <h1 className="text-neutral-900 font-bold text-4xl mb-2 font-body">Welcome Back!</h1>
        <p className="text-base font-light text-neutral-900">To the ultimate education platform for dental professionals.</p>
      </header>

      <section className="w-full">
        <LoginForm
          onSubmit={onSubmit}
          loading={isLoading}
        />

        <p className="text-neutral-900 text-center mt-6">Don't have an account? <Link href="/register" className="text-accent-secondary font-medium">Sign Up</Link></p>
      </section>
    </div>
  )
}

export default Login