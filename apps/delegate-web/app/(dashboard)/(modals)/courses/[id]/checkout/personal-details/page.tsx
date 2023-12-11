'use client'

import { type FC } from 'react'
import { Button, ButtonVariant, EmailField, Icon, IconName } from '@dentor/ui'
import { useForm } from 'react-hook-form'
import { useParams, useRouter } from 'next/navigation'

interface FormData {
  email: string
}

const CheckoutPersonalDetailsView: FC = () => {
  const router = useRouter()
  const params = useParams()
  const { handleSubmit, control, formState: { errors } } = useForm<FormData>()

  const onHandleSubmit = (data: FormData) => {
    router.push(`/courses/${params.id}/checkout?email=${data.email}`)
  }

  return (
    <div className="w-full px-8 lg:px-20">
      <header className="mb-10">
        <Icon
          className="text-neutral-900 mb-7 !text-4xl"
          name={IconName.User}
        />
        <h1 className="text-neutral-900 font-bold text-4xl mb-2 font-body">Personal Details</h1>
        <p className="text-base font-light text-neutral-900">
          Please enter your personal details to continue.
        </p>
      </header>

      <section>
        <form action="" onSubmit={handleSubmit(onHandleSubmit)}>
          <EmailField
            control={control}
            error={errors?.email?.message}
          />

          <Button
            className="mt-8"
            variant={ButtonVariant.Secondary}
            type="submit"
            fluid
          >
            <p className="text-white">Continue</p>
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
            <p className="text-accent-secondary">Cancel Checkout</p>
          </Button>
        </form>
      </section>
    </div>
  )
}

export default CheckoutPersonalDetailsView