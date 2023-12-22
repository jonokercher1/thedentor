import { type FC } from 'react'
import { Control, Controller, FieldErrors, UseFormHandleSubmit } from 'react-hook-form'
import { AccountDetailsFormData } from './AccountDetailsView'
import { Button, ButtonVariant, TextInput } from '@dentor/ui'

interface AccountDetailsFormProps {
  control: Control<AccountDetailsFormData, any>
  errors: FieldErrors<AccountDetailsFormData>
  // TODO: theres a better way of doing this but my brain stopped working
  handleSubmit: UseFormHandleSubmit<AccountDetailsFormData>
  onSubmit: (data: AccountDetailsFormData) => void
  loading: boolean
}

const AccountDetailsForm: FC<AccountDetailsFormProps> = ({ control, errors, handleSubmit, onSubmit, loading }) => {

  return (
    <section className="w-full">
      <form onSubmit={handleSubmit(onSubmit)}>
        <Controller
          name="name"
          control={control}
          defaultValue=""
          rules={{
            required: {
              value: true,
              message: 'Name is required'
            },
          }}
          render={({ field }) => (
            <TextInput
              label={{
                value: 'Name*'
              }}
              className="mb-7"
              error={errors.name?.message}
              {...field}
            />
          )}
        />

        <Controller
          name="phone"
          control={control}
          defaultValue=""
          render={({ field }) => (
            <TextInput
              label={{
                value: 'Phone'
              }}
              className="mb-7"
              error={errors.phone?.message}
              {...field}
            />
          )}
        />

        <Controller
          name="gdcNumber"
          control={control}
          defaultValue=""
          rules={{
            required: {
              value: true,
              message: 'GDC Number is required'
            },
            maxLength: {
              value: 6,
              message: 'Please enter a valid GDC number'
            }
          }}
          render={({ field }) => (
            <TextInput
              label={{
                value: 'GDC Number*'
              }}
              className="mb-7"
              error={errors.gdcNumber?.message}
              {...field}
            />
          )}
        />

        <Button
          variant={ButtonVariant.Secondary}
          type="submit"
          loading={loading}
          fluid
        >
          Complete Profile
        </Button>
      </form>
    </section>
  )
}

export default AccountDetailsForm