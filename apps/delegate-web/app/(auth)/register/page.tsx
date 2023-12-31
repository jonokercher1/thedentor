'use client'

import { type FC, useState } from 'react'
import RegisterAccountDetailsForm from '@/app/(auth)/register/components/RegisterAccountDetailsForm'
import { FormProvider, useForm } from 'react-hook-form'
import RegisterPasswordForm from '@/app/(auth)/register/components/RegisterPasswordForm'
import Link from 'next/link'
import register from '@/api/auth/register'
import { useQueryState, useToast } from '@dentor/ui'
import { useRouter } from 'next/navigation'
import { Button, ButtonVariant } from '@dentor/ui'

export interface RegisterFormData {
  name: string
  email: string
  phone: string
  gdcNumber: string
  password: string
  passwordConfirmation: string
  termsAndConditions: boolean
}

enum RegisterView {
  AccountDetails = 'account-details',
  Password = 'password',
}

const viewConfig = [
  { name: RegisterView.AccountDetails, component: <RegisterAccountDetailsForm /> },
  { name: RegisterView.Password, component: <RegisterPasswordForm /> },
]

const Register: FC = () => {
  const router = useRouter()
  const { errorToast, successToast } = useToast()
  const form = useForm<RegisterFormData>()
  const [currentView, setCurrentView] = useState(viewConfig[0]) // TODO: replace with reducer
  const { isLoading, queryLoading, querySuccessful, setQueryError } = useQueryState()

  const validateView = async (viewName: RegisterView): Promise<boolean> => {
    if (viewName === RegisterView.AccountDetails) {
      return form.trigger(['name', 'email', 'gdcNumber', 'phone'])
    }

    return form.trigger(['password', 'passwordConfirmation'])
  }

  const onMoveForward = async () => {
    const currentViewIndex = viewConfig.findIndex(config => config.name === currentView.name)
    const hasAnotherView = currentViewIndex + 1 < viewConfig.length

    if (hasAnotherView) {
      const currentView = viewConfig[currentViewIndex]
      const nextView = viewConfig[currentViewIndex + 1]
      const isViewValid = await validateView(currentView.name)

      if (isViewValid) {
        setCurrentView(nextView)
      }
    }
  }

  const onRegister = async (data: RegisterFormData) => {
    try {
      queryLoading()
      const response = await register(data)

      if (response.statusCode > 299) {
        throw new Error(response.message)
      }

      querySuccessful()
      successToast('Account created')
      router.push('/')
    } catch (e: any) {
      setQueryError(e.message)
      errorToast(e.message ?? 'Unable to register')
    }
  }

  const onSubmit = (data: RegisterFormData) => {
    if (currentView.name === viewConfig[viewConfig.length - 1].name) {
      onRegister(data)
    } else {
      onMoveForward()
    }
  }

  return (
    <div className="p-8 lg:px-20 w-full">
      <FormProvider {...form}>
        <form action="" onSubmit={form.handleSubmit(onSubmit)}>
          {currentView.component}

          <Button
            variant={ButtonVariant.Secondary}
            type="submit"
            className="mt-6"
            fluid
            loading={isLoading}
          >
            {currentView.name === viewConfig[0].name ? 'Continue' : 'Create Account'}
          </Button>

          <p className="text-neutral-900 text-center mt-6">Already have an account? <Link href="/login" className="text-accent-secondary font-medium">Log In</Link></p>
        </form>
      </FormProvider>
    </div>
  )
}

export default Register