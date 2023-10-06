'use client'

import { passwordStrength as checkPasswordStrength, type Options } from 'check-password-strength'

export type PasswordStrength = 0 | 1 | 2 | 3 | 4

interface UsePasswordStrengthResponse {
  strength: PasswordStrength
}

const passwordStrengthConfiguration: Options<PasswordStrength> = [
  {
    id: 0,
    value: 0,
    minDiversity: 0,
    minLength: 0,
  },
  {
    id: 1,
    value: 1,
    minDiversity: 1,
    minLength: 6,
  },
  {
    id: 2,
    value: 2,
    minDiversity: 2,
    minLength: 8,
  },
  {
    id: 3,
    value: 3,
    minDiversity: 3,
    minLength: 12,
  },
  {
    id: 4,
    value: 4,
    minDiversity: 4,
    minLength: 12,
  },
]

export const usePasswordStrength = (password: string): UsePasswordStrengthResponse => {
  const strength: PasswordStrength = password.length ? checkPasswordStrength(password, passwordStrengthConfiguration).value : 0
  return { strength }
}