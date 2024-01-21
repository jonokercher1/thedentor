'use client'

import { type FC } from 'react'
import LoginOneTimePasswordForm from '@/app/auth/_components/LoginOneTimePasswordForm'
import { useParams, useRouter } from 'next/navigation'
import { CurrentUser } from '@/types/api/auth/current-user'

const VerifyLogin: FC = () => {
  const router = useRouter()
  const params = useParams()
  console.log("🚀 ~ params:", params.from)

  const onHnadleSuccess = (data: CurrentUser) => {
    switch (data.onboardingState) {
      case 'complete':
        router.replace('/courses')

      case 'incomplete':
      case 'not-started':
      default:
        router.replace('/auth/account-details')
    }
  }

  return (
    <LoginOneTimePasswordForm
      onSuccess={onHnadleSuccess}
    />
  )
}

export default VerifyLogin