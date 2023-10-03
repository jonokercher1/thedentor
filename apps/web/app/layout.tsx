import './globals.css'
import type { Metadata } from 'next'
import { FC, PropsWithChildren } from 'react'
import { Roboto } from 'next/font/google'
import classNames from 'classnames'
import { Toaster } from 'react-hot-toast'

export const roboto = Roboto({
  subsets: ['latin'],
  weight: ['100', '300', '500', '700', '900'],
  variable: '--body-font'
})

export const metadata: Metadata = {
  title: 'The Dentor',
  description: 'The ultimate education platform for dental professionals',
}

const RootLayout: FC<PropsWithChildren> = ({ children }) => {
  const rootClasses = classNames('min-h-screen', roboto.variable)
  const bodyClasses = classNames('min-h-screen flex font-body')

  return (
    <html lang="en" className={rootClasses}>
      <body className={bodyClasses}>
        <Toaster />
        {children}
      </body>
    </html>
  )
}

export default RootLayout
