import { LinkableLogo } from '@dentor/ui'
import { PropsWithChildren, type FC } from 'react'

const CourseFeedbackLayout: FC<PropsWithChildren> = ({ children }) => {
  return (
    <main className="bg-neutral-200 flex flex-col flex-1">
      <header className="flex items-center justify-center py-12 bg-neutral-700 w-screen">
        <LinkableLogo className="text-white" />
      </header>

      {children}
    </main>
  )
}

export default CourseFeedbackLayout