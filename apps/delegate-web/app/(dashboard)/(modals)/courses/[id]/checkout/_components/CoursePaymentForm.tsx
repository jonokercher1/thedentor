'use client'

import { Button, ButtonVariant, Icon, IconName, useToast } from '@dentor/ui';
import { PaymentElement, useElements, useStripe } from '@stripe/react-stripe-js';
import { useParams, useRouter } from 'next/navigation';
import { type FC, FormEvent, useState, useEffect } from 'react'

interface CoursePaymentFormProps {

}

const CoursePaymentForm: FC<CoursePaymentFormProps> = () => {
  const stripe = useStripe()
  const elements = useElements()
  const { errorToast } = useToast()
  const params = useParams()

  const [isLoading, setIsLoading] = useState(false)

  const onHandleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    if (!stripe || !elements) {
      return;
    }

    setIsLoading(true)

    const res = await stripe.confirmPayment({
      elements,
      confirmParams: {
        // TODO: append success page to current url
        return_url: `${window.location.href}/success`,
      },
    });
    // TODO: handle res.error
    if (res.error) {
      errorToast(res.error.message ?? 'Payment failed, please check your details and try again')
    }

    setIsLoading(false)
  }

  return (
    <form onSubmit={onHandleSubmit}>
      <PaymentElement />

      <Button
        className="mt-8"
        variant={ButtonVariant.Secondary}
        loading={isLoading}
        type="submit"
        fluid
      >
        {/* TODO: replace this with course price once we have the get course api endpoint */}
        <p className="text-white">Pay £59.99 now</p>
      </Button>

      <Button
        className="mt-3"
        variant={ButtonVariant.Transparent}
        href={`/courses/${params.id}`}
        fluid
      >
        <Icon
          name={IconName.ChevronLeft}
          className="text-accent-secondary"
        />
        <p className="text-accent-secondary">Cancel Payment</p>
      </Button>
    </form>
  )
}

export default CoursePaymentForm