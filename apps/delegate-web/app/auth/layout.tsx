import { PropsWithChildren, type FC } from 'react'
import SplitScreenLayout from '../_components/SplitScreenLayout'

const AuthLayout: FC<PropsWithChildren> = ({ children }) => {
  // TODO: if the url is just /auth we need to push to /auth/login

  return (
    <SplitScreenLayout>
      {children}
    </SplitScreenLayout>
  )
}

export default AuthLayout
