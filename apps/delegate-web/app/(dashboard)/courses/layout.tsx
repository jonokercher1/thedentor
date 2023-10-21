// tabs/search
// children
import { type PropsWithChildren, type FC } from 'react'

const CoursesLayout: FC<PropsWithChildren> = ({ children }) => {
  return (
    <>
      {/* Tabs */}
      {children}
    </>
  )
}

export default CoursesLayout