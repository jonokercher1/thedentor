import { PropsWithChildren, type FC } from 'react'
import BackgroundImage from '../../public/auth-background.png'
import Image from 'next/image'
import { Logo } from '@dentor/ui'

const AuthLayout: FC<PropsWithChildren> = ({ children }) => {
  return (
    <main className="grid lg:grid-cols-2 w-full">
      <aside className="hidden lg:block bg-neutral-900 relative p-20">
        <Logo className="text-white absolute z-30" />
        <Image
          src={BackgroundImage}
          alt=""
          fill
          className="object-cover object-center"
        />
      </aside>

      <section className="bg-neutral-200 flex flex-col">
        <div className="flex-grow flex items-center 2xl:px-20">
          {children}
        </div>

        <footer className="py-6 text-center mt-auto">
          <p className="font-light text-neutral-300">The Dentor &copy; 2023</p>
        </footer>
      </section>
    </main>
  )
}

export default AuthLayout
