import toast from 'react-hot-toast'

export const successToast = (message: string) => {
  console.log('showing success toast')
  toast.success(message, {
    className: 'bg-state-success text-white'
  })
}

export const errorToast = (message: string) => {
  console.log('showing error toast')
  toast.error(message, {
    className: 'bg-state-error text-white'
  })
}