import { type FC, type PropsWithChildren } from 'react'
import Header from '@/app/_components/Header'
import Footer from '@/app/_components/Footer'

const DashboardLayout: FC<PropsWithChildren> = ({ children }) => (
  <div className="bg-complementary-primary w-full">
    <Header />
    {children}
    <Footer />
  </div>
)

export default DashboardLayout