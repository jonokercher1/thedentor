'use client'

import { type FC } from 'react'
import { Icon, IconName, useApiRequest, useToast } from '@dentor/ui'
import AccountDetailsForm from './AccountDetailsForm'
import { useForm } from 'react-hook-form'
import updateSelf, { UpdateSelfBody, UpdateSelfResposne } from '@/api/user/update-self'
import { useRouter } from 'next/navigation'
import { CurrentUser } from '@/types/api/auth/current-user'

export interface AccountDetailsViewProps {
  currentUser: CurrentUser
}

export interface AccountDetailsFormData {
  name: string
  phone: string
  gdcNumber: string
}

const AccountDetailsView: FC<AccountDetailsViewProps> = ({ currentUser }) => {
  const router = useRouter()
  const { errorToast, successToast } = useToast()
  const { control, handleSubmit, setError, formState: { errors } } = useForm<AccountDetailsFormData>({
    defaultValues: currentUser
  })

  const { isLoading, sendApiRequest } = useApiRequest<UpdateSelfResposne, UpdateSelfBody>({
    request: updateSelf,
    onSuccess: () => {
      successToast('Account setup completed 🎉')
      router.replace(`/courses`)
    },
    onError: () => errorToast('Error updating account - please try again'),
    setFieldError: (name, { message }) => setError(name as any, { message })
  })

  const onHandleSubmit = async (data: AccountDetailsFormData) => {
    // TODO: might need to strip empty strings
    await sendApiRequest({
      name: data.name,
      phone: data.phone,
      gdcNumber: data.gdcNumber,
    })
  }

  return (
    <div className="w-full">
      <header className="mb-10">
        <Icon name={IconName.VerifiedUser} className="w-10 h-10 mb-10" />
        <h1 className="text-neutral-900 font-bold text-4xl mb-2 font-body">Lets get to know you better</h1>
        <p className="text-base font-light text-neutral-900">
          Please provide us with some basic information about yourself so we can complete your account setup.
        </p>
      </header>

      {/* TODO: we can probably refactor this to a 'update-self-form' or similar, and re-use it */}
      <AccountDetailsForm
        control={control}
        errors={errors}
        handleSubmit={handleSubmit}
        onSubmit={onHandleSubmit}
        loading={isLoading}
      />
    </div>
  )
}

export default AccountDetailsView