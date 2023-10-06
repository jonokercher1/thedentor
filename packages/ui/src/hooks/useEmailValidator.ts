'use client'

import EmailValidator from 'email-validator'

interface UseEmailValidatorResponse {
  validateEmail: (value: string) => boolean
}

export const useEmailValidator = (): UseEmailValidatorResponse => {
  const validateEmail = (value: string): boolean => {
    return EmailValidator.validate(value)
  }

  return {
    validateEmail
  }
}