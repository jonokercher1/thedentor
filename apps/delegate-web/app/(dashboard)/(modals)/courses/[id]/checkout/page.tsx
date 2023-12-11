import { type FC } from 'react'
import CourseCheckout from './_components/CourseCheckout'
import createCoursePurchaseIntent from '@/api/course/checkout/create-course-purchase-intent'

const CourseCheckoutView: FC = async ({ params, searchParams }: any) => {
  const { data } = await createCoursePurchaseIntent({
    courseId: params.id,
    email: searchParams.email
  })

  if (!data?.clientSecret) {
    throw new Error('Error loading checkout')
  }

  return (
    <section className="w-full px-8 lg:px-20">
      <CourseCheckout clientSecret={data.clientSecret} />
    </section>
  )
}

export default CourseCheckoutView