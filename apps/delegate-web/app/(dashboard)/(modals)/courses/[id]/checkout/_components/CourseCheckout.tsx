'use client'

import { type FC } from 'react'
import { Elements } from '@stripe/react-stripe-js'
import { loadStripe } from '@stripe/stripe-js'
import CoursePaymentForm from './CoursePaymentForm'
import { Icon, IconName } from '@dentor/ui'

interface CourseCheckoutProps {
  clientSecret: string
}

const stripePromise = loadStripe('pk_test_51NWcqdFoWbJ9SEsuEEKDkHB6VqtUlohyzXdZyxFvWEcK5wuNfycv9H6xRaohRNYeoKakggTPvSpXosKFye0YJdWv00Sn1paVvX');

const CourseCheckout: FC<CourseCheckoutProps> = ({ clientSecret }) => {
  return (
    <div>
      <header className="mb-10">
        <Icon
          className="text-neutral-900 mb-7 text-4xl"
          name={IconName.PaymentApproved}
        />
        <h1 className="text-neutral-900 font-bold text-4xl mb-2 font-body">Make a Payment</h1>
        <p className="text-base font-light text-neutral-900">Please provide your details to complete your booking.</p>
      </header>
      <Elements options={{ clientSecret }} stripe={stripePromise}>
        <CoursePaymentForm />
      </Elements>
    </div>
  )
}

export default CourseCheckout