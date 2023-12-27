import { type FC } from 'react'
import CourseCheckout from './_components/CourseCheckout'
import createCoursePurchaseIntent from '@/api/course/checkout/create-course-purchase-intent'
import getSelf from '@/api/auth/get-self'
import { redirect } from 'next/navigation'

const CourseCheckoutView: FC = async ({ params }: any) => {
  const currentUser = await getSelf({ suppressUnauthorisedError: true })

  if (!currentUser?.data?.email) {
    redirect(`/courses/${params.id}/checkout/personal-details`)
  }

  const { data } = await createCoursePurchaseIntent({
    courseId: params.id,
    email: currentUser?.data?.email
  })

  if (!data?.clientSecret) {
    throw new Error('Error loading checkout')
  }

  return (
    <section className="w-full">
      <CourseCheckout clientSecret={data.clientSecret} />
    </section>
  )
}

export default CourseCheckoutView