import { type FC } from 'react'
import LoginOneTimePasswordForm from '@/app/auth/_components/LoginOneTimePasswordForm'
import { useRouter } from 'next/navigation'
import { CurrentUser } from '@/types/api/auth/current-user'

const VerifyLogin: FC = () => {
  const router = useRouter()
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