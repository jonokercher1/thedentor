import ResetPasswordForm from '@/components/auth/ResetPasswordForm'
import { type FC } from 'react'

export interface ResetPasswordFormData {
  password: string
  passwordConfirmation: string
}

const ResetPassword: FC = () => {
  // Check the token in the backend, redirect away if not valid

  return (
    <ResetPasswordForm />
  )
}

export default ResetPassword