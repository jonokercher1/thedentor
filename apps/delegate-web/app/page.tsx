import { FC } from 'react'
import getSelf from '@/api/auth/get-self'
import { redirect } from 'next/navigation'

const Home: FC = async () => {
  const currentUser = await getSelf()

  if (currentUser.statusCode > 299) {
    redirect('/login')
  }

  // TODO: add in home page here and remove redirect from next config
  return null
}

export default Home
