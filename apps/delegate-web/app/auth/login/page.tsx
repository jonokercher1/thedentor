'use client'

import { type FC } from 'react'
import LoginEmailForm, { LoginFormSuccessData } from '@/app/auth/_components/LoginEmailForm'
import { useRouter, useSearchParams } from 'next/navigation'

const Login: FC = () => {
  const router = useRouter()
  const searchParams = useSearchParams()

  const onHandleSubmit = (data?: LoginFormSuccessData) => {
    let url = `/auth/verify`
    const params = new URLSearchParams()

    // TODO: this is really bad and temporary. We need to make a generic util for managing state via url params
    if (searchParams.has('from')) {
      params.append('from', searchParams.get('from')!)
    }

    if (data?.email) {
      params.append('email', data.email)
    }

    if (data?.createdAt) {
      params.append('createdAt', data.createdAt)
    }

    router.replace(`${url}?${params.toString()}` as any)
  }

  return (
    <LoginEmailForm
      onSuccess={onHandleSubmit}
    />
  )
}

export default Login