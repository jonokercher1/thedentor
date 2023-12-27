'use client'

import { type FC } from 'react'
import LoginEmailForm, { LoginFormSuccessData } from '@/app/auth/_components/LoginEmailForm'
import { useRouter } from 'next/navigation'

const Login: FC = () => {
  const router = useRouter()
  const onHandleSubmit = (data?: LoginFormSuccessData) => {
    let url = `/auth/verify`

    if (data?.email) {
      url += `?email=${data.email}`
    }

    if (data?.createdAt) {
      url += `&createdAt=${data.createdAt}`
    }

    router.replace(url as any)
  }

  return (
    <LoginEmailForm
      onSuccess={onHandleSubmit}
    />
  )
}

export default Login