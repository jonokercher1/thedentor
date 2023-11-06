import { Container } from '@dentor/ui'
import { type FC } from 'react'
import OwnedCoursesHeader from './_components/OwnedCoursesHeader'

// TODO: add type
const OwnedInPersonCoursesPage: FC<any> = ({ searchParams }) => {
  console.log("🚀 ~ file: page.tsx:7 ~ searchParams:", searchParams)

  // TOOD: Filter owned courses by tab: upcoming, past, saved. empty tab is all 

  return (
    <Container>
      <OwnedCoursesHeader />
    </Container>
  )
}

export default OwnedInPersonCoursesPage