'use client'

import { Review } from '@/types/api/review/review'
import { Icon, IconName } from '@dentor/ui'
import { type FC } from 'react'

interface ReviewCardProps {
  review: Review
}

const ReviewCard: FC<ReviewCardProps> = ({ review }) => {
  return (
    <article className="bg-white rounded-2xl shadow-lg px-7 py-8">
      <header className="flex gap-4 mb-7">
        {/* TOOD: add dentor profile image */}
        <div className="shadow h-14 w-14 rounded-full bg-accent-primary shrink-0" />

        <div>
          <h3 className="text-neutral-600 font-bold">{review.title}</h3>
          {Array.from({ length: review.rating }).map((_, index) => (
            <Icon
              name={IconName.Star}
              key={`review-card-${review.id}-star-${index}`}
              className="text-accent-secondary h-5 w-5"
            />
          ))}
        </div>
      </header>

      <p className="text-neutral-600">{review.content}</p>
    </article>
  )
}

export default ReviewCard