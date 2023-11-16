'use client'

import { usePathname, useRouter } from 'next/navigation'
import { useState, type FC, useEffect } from 'react'
import SearchInput from '../../_components/SearchInput'
import { Button, ButtonVariant, Icon, IconName } from '@dentor/ui'

interface SearchHeaderProps {
  searchPathname: string
  search: string
  setSearch: (value: string) => void
}

const SearchHeader: FC<SearchHeaderProps> = ({ searchPathname, search, setSearch }) => {
  const pathname = usePathname()
  const navigation = useRouter()

  const [searchActive, setSearchActive] = useState(pathname === searchPathname)

  const onGoBack = () => {
    navigation.back()
  }

  useEffect(() => {
    if (pathname === searchPathname) {
      setSearchActive(true)
    } else {
      setSearchActive(false)
    }
  }, [pathname])

  return (
    <section className="flex items-center justify-center">
      {searchActive && (
        <Button
          variant={ButtonVariant.Tertiary}
          className="!py-2 !pl-4 absolute left-0"
          onClick={onGoBack}
        >
          <Icon
            name={IconName.ChevronLeft}
            className="text-white"
          />

          <p className="text-white">Back</p>
        </Button>
      )}

      <SearchInput
        active={searchActive}
        value={search}
        onChange={setSearch}
      />
    </section>
  )
}

export default SearchHeader