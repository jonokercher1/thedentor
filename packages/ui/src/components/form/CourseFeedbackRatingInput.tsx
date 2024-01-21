'use client'

import { useId, type FC, ForwardRefRenderFunction, forwardRef } from 'react'
import InputError from './InputError'
import classNames from 'classnames'

interface CourseFeedbackRatingInputProps {
  error?: string
  value: number
  onChange: (value: number) => void
  disabled?: boolean
}

const maxRating = 5

const CourseFeedbackRatingInput: ForwardRefRenderFunction<HTMLInputElement, CourseFeedbackRatingInputProps> = ({ error, value, onChange, disabled }, ref) => {
  const id = useId()
  const subTextClasses = 'mt-2 font-light text-sm text-neutral-400 absolute -bottom-3'
  const baseButtonClasses = 'relative w-6 h-6 rounded-full border border-neutral-300 focus:outline-none bg-white transition-all duration-200 ease delay-75'
  const progressBarFillClasses = classNames('absolute h-3 top-[22px] bg-accent-secondary rounded-full border border-transparent transition-all duration-200 ease', {
    'w-full': value === maxRating,
    'w-0 !left-[2px]': !value || value === 1,
    'w-1/4': value === 2,
    'w-2/4': value === 3,
    'w-3/4': value === 4,
  })

  return (
    <div className="flex justify-between relative">
      <span className="absolute w-full h-3 top-[22px] border border-neutral-300 bg-white rounded-full" />
      <span className={progressBarFillClasses} />

      {[...Array(maxRating)].map((_, index) => {
        const buttonClasses = classNames(baseButtonClasses, {
          'bg-neutral-500': disabled,
          '!bg-accent-secondary !border-accent-secondary': value >= index + 1,
        })

        return (
          <div
            className="flex flex-col py-4"
            key={`course-feedback-rating-input-${id}-input-${index}`}
            ref={ref}
          >
            <button
              type="button"
              onClick={() => onChange(index + 1)}
              className={buttonClasses}
              disabled={disabled}
            />

            {index === 0 && (
              <p className={classNames(subTextClasses, 'left-0')}>Totally Disagree</p>
            )}

            {index + 1 === maxRating && (
              <p className={classNames(subTextClasses, 'right-0')}>Fully Agree</p>
            )}
          </div>
        )
      })}

      <InputError error={error} />
    </div>
  )
}

export default forwardRef(CourseFeedbackRatingInput)