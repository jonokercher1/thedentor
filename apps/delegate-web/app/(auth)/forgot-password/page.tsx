'use client'

import requestPasswordReset from '@/api/auth/request-password-reset'
import RequestPasswordResetForm from '@/components/auth/RequestPasswordResetForm'
import ResetPasswordRequestSuccess from '@/components/auth/ResetPasswordRequestSuccess'
import { Button, ButtonVariant, EmailField, Icon, IconName, useApiRequest, useToast } from '@dentor/ui'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { useReducer, type FC } from 'react'
import { useForm } from 'react-hook-form'

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