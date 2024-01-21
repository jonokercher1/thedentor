import { type FC } from 'react'

interface InputErrorProps {
  error?: string
}

const InputError: FC<InputErrorProps> = ({ error }) => {
  if (!error) {
    return null
  }

  return (
    <p className="text-xs absolute block top-full pt-1 text-state-error font-bold capitalize">{error}</p>
  )
}

export default InputError