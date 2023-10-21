import { type FC, type PropsWithChildren } from 'react'
import Header from '@/app/_components/Header'
import Footer from '@/app/_components/Footer'

const DashboardLayout: FC<PropsWithChildren> = ({ children }) => (
  <>
    <Header />
    {children}
    <Footer />
  </>
)

export default DashboardLayout