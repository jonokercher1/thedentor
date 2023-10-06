import { type FC } from 'react'
import { Controller, useFormContext } from 'react-hook-form'
import EmailValidator from 'email-validator'
import { TextInput, CreateAccountIcon } from '@dentor/ui'
import { RegisterFormData } from '@/app/(auth)/register/page'

interface RegisterAccountDetailsProps {

}

const RegisterAccountDetailsForm: FC<RegisterAccountDetailsProps> = () => {
  const { control, formState: { errors } } = useFormContext<RegisterFormData>()

  return (
    <div>
      <header className="mb-10">
        <CreateAccountIcon className="text-neutral-900 mb-10" />
        <h1 className="text-neutral-900 font-bold text-4xl mb-2 font-body">Create Account</h1>
        <p className="text-base font-light font-medium text-neutral-900">Stay ahead of the curve, benefit from the best education.</p>
      </header>

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
        name="email"
        control={control}
        defaultValue=""
        rules={{
          required: {
            value: true,
            message: 'Email is required'
          },
          validate: (value) => {
            if (!EmailValidator.validate(value)) {
              return 'Email is invalid'
            }

            return undefined
          }
        }}
        render={({ field }) => (
          <TextInput
            label={{
              value: 'Email*'
            }}
            className="mb-7"
            type="email"
            error={errors.email?.message}
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
    </div>
  )
}

export default RegisterAccountDetailsForm