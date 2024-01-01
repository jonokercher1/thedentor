import { FC, Suspense } from 'react'
import DentorReviewsLoading from './DentorReviewsLoading'
import DentorReviewsContent from './DentorReviewsContent'
import { Dentor } from '@/types/api/dentor/dentor'

export interface DentorReviewsProps {
  dentor: Dentor
}

const DentorReviews: FC<DentorReviewsProps> = ({ dentor }) => {
  return (
    <Suspense fallback={< DentorReviewsLoading />}>
      <DentorReviewsContent dentor={dentor} />
    </Suspense>
  )
}

export default DentorReviews