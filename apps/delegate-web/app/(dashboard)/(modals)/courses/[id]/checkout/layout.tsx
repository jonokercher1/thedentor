import { PropsWithChildren, type FC } from 'react'
import SplitScreenLayout from '@/app/_components/SplitScreenLayout'

const CourseCheckoutLayout: FC<PropsWithChildren> = ({ children }) => {
  return (
    <SplitScreenLayout>
      {children}
    </SplitScreenLayout>
  )
}

export default CourseCheckoutLayout
