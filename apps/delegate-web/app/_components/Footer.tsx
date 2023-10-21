'use client'

import { Container, Icon, IconName, Logo } from '@dentor/ui'
import classNames from 'classnames'
import Link from 'next/link'
import { type FC } from 'react'

interface FooterProps { }

const socialLinks = [
  { href: 'https://instagram.com/the_dentor', icon: IconName.Instagram },
  { href: 'https://www.facebook.com/the.dentor.education', icon: IconName.Facebook },
]

const footerNavItems = [
  { label: 'Privacy Policy', route: '/privacy-policy' },
  { label: 'Cookie Policy', route: '/cookie-policy' },
]

const Footer: FC<FooterProps> = () => {
  return (
    <footer className="text-white">
      <Container>
        <section className="flex items-center justify-between gap-12">
          <Link href="/">
            <Logo />
          </Link>

          <div className="flex gap-3 items-center justify-center">
            {socialLinks.map((link, index) => (
              <div
                key={`footer-social-links-${index}`}
                className="rounded-full bg-accent-primary  h-8 w-8 flex items-center justify-center"
              >
                <Icon name={link.icon} />
              </div>
            ))}
          </div>
        </section>

        <section className="flex items-center justify-between gap-12 mt-20">
          <nav>
            <ul className="list-none flex items-center">
              {footerNavItems.map((item, index) => (
                <li
                  key={`footer-nav-item-${index}`}
                  className={
                    classNames({
                      ['pr-3 border-r border-white']: index < footerNavItems.length - 1,
                      ['pl-3']: index > 0
                    })
                  }
                >
                  <Link href={item.route as any}>
                    <p className->{item.label}</p>
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <p>The Dentor &copy; {new Date().getFullYear()}</p>
        </section>
      </Container>
    </footer >
  )
}

export default Footer