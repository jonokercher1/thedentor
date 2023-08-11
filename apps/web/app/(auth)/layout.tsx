import { PropsWithChildren, type FC } from 'react'

const AuthLayout: FC<PropsWithChildren> = ({ children }) => {
  return (
    <main className="grid lg:grid-cols-2 w-full">
      <aside className="hidden lg:block bg-neutral-900">
        {/* Image */}
      </aside>

      <section className="bg-neutral-200 flex items-center justify-center">
        {children}
      </section>
    </main>
  )
}

export default AuthLayout