import { PropsWithChildren, type FC } from 'react'
import SplitScreenLayout from '../_components/SplitScreenLayout'

const AuthLayout: FC<PropsWithChildren> = ({ children }) => {
  return (
    <SplitScreenLayout>
      {children}
    </SplitScreenLayout>
  )
}

export default AuthLayout
