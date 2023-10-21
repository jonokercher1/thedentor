import { type FC } from 'react'
import { Control, Controller, FieldErrors, UseFormHandleSubmit } from 'react-hook-form'
import { Checkbox, EmailField, PasswordField } from '@dentor/ui'
import { Button, ButtonVariant } from '@dentor/ui'
import { type LoginFormData } from '@/app/(auth)/login/page'
import Link from 'next/link'

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
      <EmailField
        control={control}
        error={errors?.email?.message}
      />

      <PasswordField
        control={control}
        error={errors?.password?.message}
      />

      <section className="flex items-center gap-3 flex-row justify-between">
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
          <p className="font-bold text-accent-secondary my-6">Forgot Password?</p>
        </Link>
      </section>

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