import { useApiRequest } from '@dentor/ui'
import { ApiHookArgs } from '../api-hooks'
import submitCourseFeedbackRequest, { CourseFeedbackAnswer, SubmitCourseFeedbackArgs, SubmitCourseFeedbackResponse } from '@/api/course/feedback/submit-course-feedback'

const useSubmitCourseFeedback = (args?: ApiHookArgs<SubmitCourseFeedbackResponse>) => {
  const { isLoading, sendApiRequest } = useApiRequest<SubmitCourseFeedbackResponse, SubmitCourseFeedbackArgs>({
    request: submitCourseFeedbackRequest,
    onSuccess: (data) => {
      if (args?.onSuccess) {
        // TODO: improve ueApiRequest typings
        args.onSuccess(data!)
      }
    },
    onError: (e) => {
      if (args?.onError) {
        args.onError(e)
      }
    },
  })

  const submitCourseFeedback = ({ courseId, answers }: SubmitCourseFeedbackArgs) => {
    sendApiRequest({ courseId, answers })
  }

  return {
    submitCourseFeedback,
    isSubmittingCourseFeedback: isLoading,
  }
}

export default useSubmitCourseFeedback