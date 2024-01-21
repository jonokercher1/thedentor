'use client'

import { CourseFeedbackQuestionType } from '@/types/api/course/course-feedback'
import { CourseFeedbackRatingInput, TextInput } from '@dentor/ui'
import { useMemo, type FC, ForwardRefRenderFunction, forwardRef } from 'react'

interface FeedbackFormFieldInputProps {
  onChange: (event: any) => void
  onBlur: () => void
  disabled?: boolean
  value: string | number | boolean | ReadonlyArray<string> | undefined
  name: string
  error?: string
}

interface FeedbackFormFieldProps {
  question: string
  type: CourseFeedbackQuestionType
  inputProps: FeedbackFormFieldInputProps
}

const FeedbackFormField: ForwardRefRenderFunction<HTMLInputElement, FeedbackFormFieldProps> = ({ question, type, inputProps }, ref) => {
  const mapFeedbackQuestionTypeToField = (
    type: CourseFeedbackQuestionType,
    inputProps: FeedbackFormFieldInputProps
  ) => {
    switch (type) {
      case CourseFeedbackQuestionType.Rating:
        return (
          <CourseFeedbackRatingInput
            ref={ref}
            {...inputProps}
            value={inputProps.value as number}
          />
        )

      case CourseFeedbackQuestionType.Text:
        return (
          <TextInput
            ref={ref}
            {...inputProps}
            value={inputProps.value as string}
          />
        )
      // case CourseFeedbackQuestionType.YesNo:
      //   return <div>YesNO</div>
      default:
        return null
    }
  }

  return (
    <div>
      <label className="font-medium uppercase text-sm block mb-2">{question}</label>
      {mapFeedbackQuestionTypeToField(type, inputProps)}
    </div>
  )
}

export default forwardRef(FeedbackFormField)