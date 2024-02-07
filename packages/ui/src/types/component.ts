import { PropsWithChildren } from 'react'

export interface AtomProps {
  className?: string
  id?: string
}

export interface AtomWithChildrenProps extends AtomProps, PropsWithChildren { }