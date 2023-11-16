'use client'

import toast from 'react-hot-toast'

export const useToast = () => {
  const successToast = (message: string) => {
    toast.success(message, {
      className: 'bg-state-success text-white'
    })
  }

  const errorToast = (message: string) => {
    toast.error(message, {
      className: 'bg-state-error text-white'
    })
  }

  return {
    errorToast,
    successToast
  }
}