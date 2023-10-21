'use client'

import { Container, Icon, IconName, Logo } from '@dentor/ui'
import Link from 'next/link'
import { type FC } from 'react'
import Nav from './Nav'
import Avatar from './Avatar'

interface HeaderProps { }

const Header: FC<HeaderProps> = () => {
  return (
    <header className="text-neutral-100 py-12">
      <Container className="flex items-center justify-between">
        <section className="flex items-center gap-20">
          <Link href="/">
            <Logo />
          </Link>

          <Nav />
        </section>

        <section className="flex items-center justify-center gap-12">
          <Icon name={IconName.NotificationBell} />
          <Avatar />
        </section>
      </Container>
    </header>
  )
}

export default Header