import { Roboto } from 'next/font/google'

export const roboto = Roboto({
  subsets: ['latin'],
  weight: ['100', '300', '500', '700', '900'],
  variable: '--body-font'
})