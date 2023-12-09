import { LinkableLogo } from '@dentor/ui';
import BackgroundImage from '@/public/grid-background.png'
import Image from 'next/image'
import { PropsWithChildren, type FC } from 'react'

interface SplitScreenLayoutProps extends PropsWithChildren { }

const SplitScreenLayout: FC<SplitScreenLayoutProps> = ({ children }) => {
  return (
    <main className="grid lg:grid-cols-2 w-full">
      <aside className="hidden lg:block bg-neutral-900 relative p-20">
        <LinkableLogo />
        <Image
          src={BackgroundImage}
          alt=""
          fill
          className="object-cover object-center"
        />
      </aside>

      <section className="bg-neutral-200 flex flex-col">
        <div className="flex-grow flex items-center px-6 lg:px-12 2xl:px-20">
          {children}
        </div>

        <footer className="py-6 text-center mt-auto">
          <p className="font-light text-neutral-300">The Dentor &copy; {new Date().getFullYear()}</p>
        </footer>
      </section>
    </main>
  )
}

export default SplitScreenLayout