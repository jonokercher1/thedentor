import { FC } from 'react'
import getCourseFeedbackQuestions from '@/api/course/feedback/get-course-feedback-questions';
import FeedbackQuestionsForm from './components/FeedbackQuestionsForm';
import { redirect } from 'next/navigation';
import getCourse from '@/api/course/get-course';

const CourseFeedbackPage: FC = async ({ params }: any) => {
  const redirectAfterLogin = `/courses/${params.id}/feedback`
  const course = await getCourse(params.id, { redirectAfterLogin })
  const questions = await getCourseFeedbackQuestions(params.id, undefined, { redirectAfterLogin })

  // TODO: handle no course data (e.g. course doesnt exist)
  if (!questions.data) {
    redirect(`/courses/${params.id}`)
  }

  return (
    <FeedbackQuestionsForm
      questions={questions.data}
      course={course.data!}
    />
  )
}

export default CourseFeedbackPage;
