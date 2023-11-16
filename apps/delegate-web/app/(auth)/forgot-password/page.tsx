'use client'

import RequestPasswordResetForm from '@/app/(auth)/forgot-password/components/RequestPasswordResetForm'
import ResetPasswordRequestSuccess from '@/app/(auth)/forgot-password/components/RequestPasswordResetSuccess'
import { useReducer, type FC } from 'react'

export interface ForgotPasswordFormData {
  email: string
}

enum CurrentViewActionType {
  Initial,
  Success
}

const ForgotPassword: FC = () => {
  const [CurrentView, updateCurrentView] = useReducer((state: any, action: any) => {
    if (action.type === CurrentViewActionType.Success) {
      return ResetPasswordRequestSuccess
    }

    return state
  }, RequestPasswordResetForm)

  return (
    <CurrentView
      onSuccess={() => updateCurrentView({ type: CurrentViewActionType.Success })}
    />
  )
}

export default ForgotPassword