'use client'

import { type FC } from 'react'
import LoginOneTimePasswordForm from '@/app/auth/_components/LoginOneTimePasswordForm'
import { useRouter, useSearchParams } from 'next/navigation'
import { CurrentUser } from '@/types/api/auth/current-user'

const VerifyLogin: FC = () => {
  const router = useRouter()
  const params = useSearchParams()

  const onHnadleSuccess = (data: CurrentUser) => {
    switch (data.onboardingState) {
      case 'complete':
        router.replace(params.get('from') ?? '/courses' as any)
        break;

      case 'incomplete':
      case 'not-started':
      default:
        router.replace('/auth/account-details')
        break;
    }
  }

  return (
    <LoginOneTimePasswordForm
      onSuccess={onHnadleSuccess}
    />
  )
}

export default VerifyLogin