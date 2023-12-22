import { type FC } from 'react'
import { redirect } from 'next/navigation'
import getSelf from '@/api/auth/get-self'
import AccountDetailsView from './components/AccountDetailsView'

const AccountDetails: FC = async () => {
  const currentUser = await getSelf()

  if (!currentUser?.data?.id) {
    redirect('/auth/login')
  }

  if (currentUser.data.onboardingState === 'not-started') {
    redirect('/auth/login')
  }

  if (currentUser.data.onboardingState === 'complete') {
    redirect('/courses')
  }

  return (
    <AccountDetailsView
      currentUser={currentUser.data}
    />
  )
}

export default AccountDetails