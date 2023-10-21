import { type PropsWithChildren } from 'react'

export interface AtomProps {
  className?: string
  id?: string
}

export interface AtomWithChildrenProps extends PropsWithChildren {
  className?: string
  id?: string
}