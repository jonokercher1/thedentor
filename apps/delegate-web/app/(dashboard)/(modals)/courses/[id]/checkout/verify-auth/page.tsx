'use client'

import LoginOneTimePasswordForm from '@/app/auth/_components/LoginOneTimePasswordForm'
import { useRouter } from 'next/navigation'
import { type FC } from 'react'

const VerifyCheckoutAuth: FC<any> = ({ params }) => {
  const router = useRouter()

  const onHnadleSuccess = () => {
    router.replace(`/courses/${params.id}/checkout`)
  }

  return (
    <LoginOneTimePasswordForm
      onSuccess={onHnadleSuccess}
    />
  )
}

export default VerifyCheckoutAuth