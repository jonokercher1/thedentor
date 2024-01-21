'use client'

import { type FC } from 'react'
import { Button, ButtonVariant, Container, Icon, IconName, useApiRequest, useToast } from '@dentor/ui';
import { CourseFeedbackQuestion } from '@/types/api/course/course-feedback';
import FeedbackFormField from './FeedbackFormField';
import { Controller, useForm } from 'react-hook-form';
import submitCourseFeedback, { CourseFeedbackAnswer, SubmitCourseFeedbackArgs, SubmitCourseFeedbackResponse } from '@/api/course/feedback/submit-course-feedback';
import { useParams } from 'next/navigation';
import { Course } from '@/types/api/course/course';

interface FeedbackQuestionsFormProps {
  questions: CourseFeedbackQuestion[]
  course: Course
}

const FeedbackQuestionsForm: FC<FeedbackQuestionsFormProps> = ({ questions, course }) => {
  const { id } = useParams()
  const { successToast, errorToast } = useToast()
  const { control, handleSubmit, formState: { errors } } = useForm({ mode: 'all' })

  const { isLoading, sendApiRequest } = useApiRequest<SubmitCourseFeedbackResponse, SubmitCourseFeedbackArgs>({
    request: submitCourseFeedback,
    onSuccess: () => {
      successToast('Feedback submitted successfully')
      // Navigate to show PDF certificate
    },
    onError: (e) => {
      errorToast('Unable to submit feedback. Please try again.')
    },
  })

  const onSubmit = (data: any) => {
    const answers: CourseFeedbackAnswer[] = Object.entries(data).map(([questionId, answer]) => ({
      questionId,
      answer: answer as any
    }))

    sendApiRequest({
      courseId: id as string,
      answers
    })
  }

  return (
    <section>
      <Container className="max-w-[900px] pb-20">
        <div className="my-16">
          <Icon
            name={IconName.AnnouncementOutlined}
            className="text-neutral-900 text-4xl mb-7"
          />

          {/* TODO: get from course endpoint, make a Text component in the ui kit */}
          <h1 className="text-neutral-900 font-bold text-4xl mb-2 font-body">{course.name}</h1>
          <p className="text-base font-light text-neutral-900">Please fill in the feedback form. You will be emailed your CPD Certificate.</p>
        </div>

        <form action="" onSubmit={handleSubmit(onSubmit)}>
          {questions.map((question, index) => (
            <Controller
              key={`course-feedback-question-${index}`}
              name={question.id}
              control={control}
              rules={{
                required: {
                  value: true,
                  message: 'This field is required'
                }
              }}
              render={({ field }) => (
                <div className="my-8">
                  <FeedbackFormField
                    question={question.question}
                    type={question.type}
                    inputProps={{
                      ...field,
                      error: errors[question.id]?.message?.toString()
                    }}
                  />
                </div>
              )}
            />
          ))}

          <footer className="pt-4">
            <Button
              type="submit"
              variant={ButtonVariant.Secondary}
              loading={isLoading}
              disabled={isLoading}
            >
              Submit Feedback & Claim CPD
            </Button>
          </footer>
        </form>
      </Container>
    </section>
  )
}

export default FeedbackQuestionsForm