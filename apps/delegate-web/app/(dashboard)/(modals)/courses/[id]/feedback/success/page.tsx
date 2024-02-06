'use client'

import useGetCpdCertificate from '@/hooks/api/cpd/useGetCpdCertificate'
import { Button, ButtonVariant, useToast } from '@dentor/ui'
import { useSearchParams } from 'next/navigation'
import { type FC } from 'react'

interface FeedbackFormSuccessPageProps { }

const FeedbackFormSuccessPage: FC<FeedbackFormSuccessPageProps> = () => {
  const searchParams = useSearchParams()
  const { errorToast } = useToast()
  const { getCpdCertificate } = useGetCpdCertificate({
    onSuccess: ({ data }) => {
      if (data?.fileUrl) {
        window.open(data.fileUrl, '_blank')
      } else {
        onError()
      }
    },
    onError: () => onError()
  })

  const onError = () => {
    errorToast('Failed to get CPD certificate. Please try again later.')
  }

  const onClickButton = () => {
    const certificateId = searchParams.get('certificateId') as string

    if (!certificateId) {
      // redirect back to feedback page ?? show error page?
      onError()
      return
    }

    getCpdCertificate(certificateId)
  }

  return (
    <section className="flex flex-1 items-center justify-center flex-col">
      <h1 className="text-neutral-900 font-bold text-4xl mb-2 font-body text-center">Thank you for your valuable feedback!</h1>
      <p className="text-base font-light text-neutral-900 text-center">
        Your feedback has been submitted. A copy of your CPD certificate has also been sent to your email.
      </p>

      <Button
        onClick={onClickButton}
        variant={ButtonVariant.Secondary}
        className="mt-8"
      >
        Download CPD Certificate
      </Button>
    </section>
  )
}

export default FeedbackFormSuccessPage