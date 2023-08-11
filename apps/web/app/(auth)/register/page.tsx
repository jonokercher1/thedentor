'use client'

import { useReducer, type FC, useState } from 'react'
import RegisterAccountDetailsForm from '@/components/auth/RegisterAccountDetailsForm'
import Button, { ButtonVariant } from '@/components/common/Button'
import { FormProvider, useForm } from 'react-hook-form'
import RegisterPasswordForm from '@/components/auth/RegisterPasswordForm'

export interface RegisterFormData {
  name: string
  email: string
  phone: string
  gdcNumber: string
  password: string
  passwordConfirmation: string
  termsAndConditions: boolean
}

const viewConfig = [
  { name: 'account-details', component: <RegisterAccountDetailsForm /> },
  { name: 'password', component: <RegisterPasswordForm /> },
]

const Register: FC = () => {
  const form = useForm<RegisterFormData>()
  const [currentView, setCurrentView] = useState(viewConfig[0])

  const onMoveForward = () => {
    const currentViewIndex = viewConfig.findIndex(config => config.name === currentView.name)
    const hasAnotherView = currentViewIndex + 1 < viewConfig.length

    if (hasAnotherView) {
      const nextView = viewConfig[currentViewIndex + 1]
      setCurrentView(nextView)
    }
  }

  const onRegister = (data: RegisterFormData) => {
    console.log("🚀 ~ file: page.tsx:35 ~ onSubmit ~ data:", data)
  }

  return (
    <div className="p-8 lg:p-20 w-full">
      <FormProvider {...form}>
        <form action="" onSubmit={e => e.preventDefault()}>
          {currentView.component}

          <Button
            variant={ButtonVariant.Secondary}
            type="submit"
            className="mt-6"
            onClick={onMoveForward}
            fluid
          // loading
          >
            Continue
          </Button>
        </form>
      </FormProvider>
    </div>
  )
}

export default Register