'use client'

import LoginForm from '@/components/auth/LoginForm'
import LoginNextIcon from '@/components/common/icons/LoginNextIcon'
import Link from 'next/link'
import { type FC } from 'react'

const Login: FC = () => {
  const onSubmit = (data: any) => {
    console.log('submitting', data)
  }

  return (
    <div className="p-8 lg:p-20 w-full">
      <header className="mb-10">
        <LoginNextIcon className="text-neutral-900 mb-10" />
        <h1 className="text-neutral-900 font-bold text-4xl mb-2 font-body">Welcome Back!</h1>
        <p className="text-base font-light text-neutral-900">To the ultimate education platform for dental professionals.</p>
      </header>

      <section className="w-full">
        <LoginForm onSubmit={onSubmit} />

        <p className="text-neutral-900 text-center mt-6">Don't have an account? <Link href="/register" className="text-accent-secondary font-medium">Sign Up</Link></p>
      </section>
    </div>
  )
}

export default Login