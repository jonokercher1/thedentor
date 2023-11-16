'use client'

import { AtomProps } from '@dentor/ui/types/Component';
import classNames from 'classnames';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { type FC } from 'react'

interface NavProps extends AtomProps { }

const navItems = [
  { label: 'Home', route: '/' },
  { label: 'Courses', route: '/courses/in-person' },
  { label: 'Videos', route: '/courses/video' },
  { label: 'Dentors', route: '/404' },
];

const Nav: FC<NavProps> = ({ className, id }) => {
  const pathname = usePathname()

  return (
    <nav className={className} id={id}>
      <ul className="list-none flex items-center gap-4">
        {navItems.map((item, index) => (
          <li key={`nav-item-${index}`}>
            <Link href={item.route as any}>
              <p
                className={
                  classNames('uppercase', {
                    ['text-accent-primary']: (pathname.startsWith(item.route) && item.route !== '/') || (item.route === '/' && pathname === '/'),
                  })
                }
              >
                {item.label}
              </p>
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  )
}

export default Nav