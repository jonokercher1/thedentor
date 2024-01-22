import { FC } from 'react'
import getCourseFeedbackQuestions from '@/api/course/feedback/get-course-feedback-questions';
import { LinkableLogo } from '@dentor/ui';
import FeedbackQuestionsForm from './components/FeedbackQuestionsForm';
import { redirect } from 'next/navigation';
import getCourse from '@/api/course/get-course';

const CourseFeedbackPage: FC = async ({ params }: any) => {
  const course = await getCourse(params.id)
  const questions = await getCourseFeedbackQuestions(params.id)

  if (!questions.data) {
    redirect(`/courses/${params.id}`)
  }

  return (
    <main className="bg-neutral-200">
      <header className="flex items-center justify-center py-12 bg-neutral-700 w-screen">
        <LinkableLogo className="text-white" />
      </header>

      <FeedbackQuestionsForm
        questions={questions.data}
        course={course.data}
      />
    </main>
  )
}

export default CourseFeedbackPage;
