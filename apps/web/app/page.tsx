import { FC } from 'react'
import getSelf from '@/api/auth/get-self'
import { redirect } from 'next/navigation'

const Home: FC = async () => {
  const currentUser = await getSelf()

  if (currentUser.statusCode > 299) {
    redirect('/login')
  }

  return (
    <main>

    </main>
  )
}

export default Home
