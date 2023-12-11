'use client'

import { type FC } from 'react'
import { Button, ButtonVariant, Icon, IconName } from '@dentor/ui'

const CourseCheckoutSuccessView: FC = async ({ params }: any) => {
  return (
    <section className="w-full px-8 lg:px-20">
      <header className="mb-10">
        <Icon
          className="text-neutral-900 mb-7 !text-4xl"
          name={IconName.CircleCheck}
        />
        <h1 className="text-neutral-900 font-bold text-4xl mb-2 font-body">You're All Booked!</h1>
        <p className="text-base font-light text-neutral-900">
          Thank you for booking via The Dentor. Please see your course information, pre-course reading and attendance OR code below.
          <br /><br />
          When vou arrive at the venue please ensure you have your QR code ticket ready to be scanned.
        </p>

        <Button
          className="mt-8"
          variant={ButtonVariant.Secondary}
          href={`/courses/${params.id}`}
          fluid
        >
          <p className="text-white">See Course</p>
        </Button>

        <Button
          className="mt-3"
          variant={ButtonVariant.Transparent}

          fluid
        >
          <p className="text-accent-secondary">My Account</p>
          <Icon
            name={IconName.ChevronRight}
            className="text-accent-secondary"
          />
        </Button>
      </header>
    </section>
  )
}

export default CourseCheckoutSuccessView