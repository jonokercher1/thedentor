'use client'

import { Container, LinkableLogo } from '@dentor/ui'
import { type FC } from 'react'
import Nav from './Nav'
import Avatar from './Avatar'

interface HeaderProps { }

const Header: FC<HeaderProps> = () => {
  return (
    <header className="text-neutral-100 py-12">
      <Container className="flex items-center justify-between">
        <section className="flex items-center gap-20">
          <LinkableLogo className="relative" />
          <Nav />
        </section>

        <section className="flex items-center justify-center gap-12">
          <Avatar />
        </section>
      </Container>
    </header>
  )
}

export default Header