'use client'

import { Button, ButtonVariant, Icon, IconName } from '@dentor/ui'
import { useParams } from 'next/navigation'
import { type FC } from 'react'

const CourseCheckoutError: FC = () => {
  const onReload = () => {
    window.location.reload()
  }

  return (
    <section className="w-full px-8 lg:px-20">
      <header className="mb-10">
        <Icon
          className="text-neutral-900 mb-7 !text-4xl"
          name={IconName.Error}
        />
        <h1 className="text-neutral-900 font-bold text-4xl mb-2 font-body">Something went wrong 😢</h1>
        <p className="text-base font-light text-neutral-900">We are unable to load the course checkout at this time. Please try again.</p>
      </header>
      <Button
        className="mt-8 lg:w-56"
        variant={ButtonVariant.Secondary}
        onClick={onReload}
      >
        <p className="text-white">Try Again</p>
      </Button>
    </section>
  )
}

export default CourseCheckoutError