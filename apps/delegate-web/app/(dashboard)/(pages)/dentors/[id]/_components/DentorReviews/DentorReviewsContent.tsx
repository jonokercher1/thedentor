import getDentorReviews from '@/api/dentor/get-dentor-reviews'
import ReviewCard from '@/app/_components/ReviewCard'
import { FC } from 'react'
import { DentorReviewsProps } from '.'

const DentorReviewsContent: FC<DentorReviewsProps> = async ({ dentor }) => {
  const reviews = await getDentorReviews(dentor.id)

  if (!reviews.data) {
    return null
  }

  return (
    <section className="py-12 lg:py-20">
      <h1 className="text-3xl mb-5">{dentor.name}'s Reviews</h1>

      <div className="grid gap-8 md:grid-cols-2">
        {reviews.data.map((review) => (
          <ReviewCard
            key={review.id}
            review={review}
          />
        ))}
      </div>
    </section>
  )
}

export default DentorReviewsContent