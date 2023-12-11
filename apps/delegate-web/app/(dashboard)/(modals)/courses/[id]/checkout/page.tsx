import { type FC } from 'react'
import CourseCheckout from './_components/CourseCheckout'
import createCoursePurchaseIntent from '@/api/course/checkout/create-course-purchase-intent'

const CourseCheckoutView: FC = async ({ params }: any) => {
  const { data } = await createCoursePurchaseIntent(params.id)

  // TODO: show error screen here
  if (!data?.clientSecret) {
    return <h1>unable to load checkout</h1>
  }

  return (
    <section className="w-full px-8 lg:px-20">
      <CourseCheckout clientSecret={data.clientSecret} />
    </section>
  )
}

export default CourseCheckoutView