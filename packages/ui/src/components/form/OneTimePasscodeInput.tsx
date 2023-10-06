'use client'

import { type FC, type ChangeEvent, useRef, createRef, useState, useEffect } from 'react'
import classnames from 'classnames'

interface OneTimePasscodeInputProps {
  value: string[]
  codeLength?: number
  onPasswordEntered: (password: string[]) => void
  onChange: (value: string[]) => void
  disabled?: boolean
  className?: string
  error?: string
}

const OneTimePasscodeInput: FC<OneTimePasscodeInputProps> = ({ onPasswordEntered, onChange, disabled, className, error, codeLength = 6 }) => {
  const containerClasses = classnames(className, 'relative font-body')
  const inputContainerClasses = classnames('flex gap-3')
  const inputClasses = classnames('w-full h-20 text-center text-3xl border-2 rounded-lg border-neutral-300 outline-none')

  const [password, setPassword] = useState<string[]>([])
  const inputRefsArray = useRef(Array.from({ length: codeLength }, () => createRef<HTMLInputElement>()))

  const updateValue = (value: string, index: number) => {
    const updatedValue = [...password]
    updatedValue[index] = value
    setPassword(updatedValue)
  }

  const moveToNextInput = (index: number) => {
    inputRefsArray.current[index + 1]?.current?.focus()

    if (index === codeLength - 1) {
      inputRefsArray.current[index]?.current?.blur()
    }
  }

  const moveToPreviousInput = (index: number) => {
    if (index === 0) return

    inputRefsArray.current[index - 1]?.current?.focus()
  }

  const onKeyDown = (event: React.KeyboardEvent<HTMLInputElement>, index: number) => {
    if (event.key === 'Backspace' && !password[index] && index > 0) {
      event.preventDefault()
      moveToPreviousInput(index)
    }
  };

  const onHandleChange = (e: ChangeEvent<HTMLInputElement>, index: number) => {
    const value = e.target.value;

    if (value.length <= 1) {
      const newPassword = [...password];
      newPassword[index] = value;
      setPassword(newPassword);
      if (newPassword.filter(Boolean).length === 6) {
        onPasswordEntered(newPassword)
        inputRefsArray.current[index]?.current?.blur()
      } else if (value) {
        moveToNextInput(index)
      } else if (index > 0) {
        moveToPreviousInput(index)
      }
    }

    updateValue(e.target.value, index)
  }

  const onPaste = (e: React.ClipboardEvent<HTMLInputElement>, currentIndex: number) => {
    const pastedData = e.clipboardData.getData('text/plain')
    const pastedChars = pastedData.split('')

    if (pastedChars.length <= codeLength - currentIndex) {
      const newPassword = [...password]

      for (let i = 0; i < pastedChars.length; i++) {
        const indexToUpdate = currentIndex + i
        newPassword[indexToUpdate] = pastedChars[i]
        inputRefsArray.current[indexToUpdate]?.current?.focus()
      }

      setPassword(newPassword)

      if (newPassword.filter(Boolean).length === 6) {
        onPasswordEntered(newPassword)
        inputRefsArray.current[currentIndex + 5]?.current?.blur()
      }
    }
  }

  useEffect(() => {
    onChange(password)
  }, [password, onChange])

  return (
    <div className={containerClasses}>
      <div className={inputContainerClasses}>
        {inputRefsArray.current?.map((ref, index) => (
          <input
            key={`magic-code-input-${index}`}
            ref={ref}
            disabled={disabled}
            className={
              classnames(
                inputClasses,
                {
                  'border-state-success border-3': !!password[index]
                }
              )
            }
            onChange={(e) => onHandleChange(e, index)}
            onKeyDown={(e) => onKeyDown(e, index)}
            onPaste={(e) => onPaste(e, index)}
            value={password[index]}
            maxLength={1}
          />
        ))}
      </div>

      {error && (
        <p className="text-xs absolute block top-full pt-1 text-state-error font-bold capitalize">{error}</p>
      )}
    </div>
  )
}

export default OneTimePasscodeInput