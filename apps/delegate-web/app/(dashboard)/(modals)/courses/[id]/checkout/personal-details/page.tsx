'use client'

import { type FC } from 'react'
import { useRouter } from 'next/navigation'
import LoginEmailForm, { LoginFormSuccessData } from '@/app/auth/_components/LoginEmailForm'

const CheckoutPersonalDetailsView: FC = ({ params }: any) => {
  const router = useRouter()

  const onHandleSubmit = (data?: LoginFormSuccessData) => {
    let url = `/courses/${params.id}/checkout/verify-auth`

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
      heading="Personal Details"
      subHeading="Please enter your personal details to continue."
      onSuccess={onHandleSubmit}
    />
  )
}

export default CheckoutPersonalDetailsView