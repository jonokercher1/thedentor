import { type FC } from 'react'
import { Control, Controller, FieldErrors, UseFormHandleSubmit, useForm } from 'react-hook-form'
import EmailValidator from 'email-validator'
import { TextInput } from '@dentor/ui'
import { Button, ButtonVariant, PasswordInput } from '@dentor/ui'
import { type LoginFormData } from '@/app/(auth)/login/page'

interface LoginFormProps {
  onSubmit: (data: LoginFormData) => void
  loading?: boolean
  control: Control<LoginFormData, any>
  errors?: FieldErrors<LoginFormData>
  handleSubmit: UseFormHandleSubmit<LoginFormData, undefined>
}

const LoginForm: FC<LoginFormProps> = ({ onSubmit, loading, control, handleSubmit, errors }) => {
  return (
    <form onSubmit={handleSubmit(onSubmit)}>
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
              value: 'Email'
            }}
            className="mb-7"
            type="email"
            error={errors?.email?.message}
            {...field}
          />
        )}
      />

      <Controller
        name="password"
        defaultValue=""
        control={control}
        rules={{
          required: {
            value: true,
            message: 'Password is required'
          },
          minLength: {
            value: 8,
            message: 'Password must be at least 8 characters'
          }
        }}
        render={({ field }) => (
          <PasswordInput
            className="mb-5"
            {...field}
            error={errors?.password?.message}
          />
        )}
      />

      {/* <section className="flex items-center gap-3 flex-row justify-between">
        <Controller
          name="remember"
          control={control}
          render={({ field }) => (
            <Checkbox
              label="Remember Me?"
              {...field}
              value={field.value ?? false}
            />
          )}
        />

        <Link href="/forgot-password">
          <p className="font-bold text-accent-secondary">Forgot Password?</p>
        </Link>
      </section> */}

      <Button
        variant={ButtonVariant.Secondary}
        type="submit"
        className="mt-6"
        onClick={handleSubmit(onSubmit)}
        fluid
        loading={loading}
      >
        Login
      </Button>
    </form>
  )
}

export default LoginForm