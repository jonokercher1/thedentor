import { FC } from 'react'
import getCourseFeedbackQuestions from '@/api/course/feedback/get-course-feedback-questions';
import { Logo } from '@dentor/ui';
import FeedbackQuestionsForm from './components/FeedbackQuestionsForm';
import { redirect } from 'next/navigation';

const CourseFeedbackPage: FC = async ({ params }: any) => {
  // const course = await getCourse(params.id) // todo: build get course api endpoint
  const questions = await getCourseFeedbackQuestions(params.id)

  if (!questions.data) {
    redirect(`/dashboard/courses/${params.id}`)
  }

  return (
    <main className="bg-neutral-200">
      <header className="flex items-center justify-center py-12 bg-neutral-700 w-screen">
        <Logo className="text-white" />
      </header>

      <FeedbackQuestionsForm questions={questions.data} />
    </main>
  )
}

export default CourseFeedbackPage;
