import getPasswordResetToken from '@/api/auth/get-password-reset-token'
import ResetPasswordForm from '@/components/auth/ResetPasswordForm'
import { redirect } from 'next/navigation'
import { type FC } from 'react'

export interface ResetPasswordFormData {
  password: string
  passwordConfirmation: string
}

const ResetPassword: FC<{ params: { token: string } }> = async ({ params }) => {
  const res = await getPasswordResetToken(params.token)

  if (res.statusCode > 299) {
    // TODO: add error toast query param
    redirect('/login')
  }
  // Check the token in the backend, redirect away if not valid

  return (
    <ResetPasswordForm />
  )
}

export default ResetPassword