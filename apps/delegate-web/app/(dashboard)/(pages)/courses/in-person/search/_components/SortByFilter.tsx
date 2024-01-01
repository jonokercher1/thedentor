'use client'

import { Dropdown, Icon, IconName } from '@dentor/ui'
import useModifiableSearchParams from '@dentor/ui/hooks/useModifiableSearchParams'
import classNames from 'classnames'
import { useRouter } from 'next/navigation'
import { useState, type FC, useId, useEffect } from 'react'

interface SortByFilterProps {
}

interface OrderByOption {
  label: string
  value: string
}

const orderByOptions: OrderByOption[] = [
  { label: 'Popularity', value: 'popularity' },
  { label: 'Title', value: 'name' },
  { label: 'Date', value: 'startDate' },
  { label: 'Distance', value: 'distance' },
]

const SortByFilter: FC<SortByFilterProps> = () => {
  const searchParams = useModifiableSearchParams()
  const id = useId()
  const [order] = useState<'asc' | 'desc'>('desc') // This is not used at the moment
  const [orderByValue, setOrderByValue] = useState<OrderByOption>()
  const [dropdownOpen, setDropdownOpen] = useState(false)

  const orderBy = searchParams.get('orderBy');

  const onSelectOption = (option: OrderByOption) => {
    if (orderBy === option.value) {
      onUpdateOrderBy(undefined)
    } else {
      onUpdateOrderBy(option.value)
    }

    setDropdownOpen(false)
  }

  const onUpdateOrderBy = (orderBy?: string) => {
    searchParams.set('order', order);
    searchParams.set('orderBy', orderBy);
    searchParams.persistStateToUrl()
  }

  useEffect(() => {
    if (!orderBy) {
      setOrderByValue(undefined)
    } else {
      const value = orderByOptions.find(o => o.value === orderBy)

      if (value) {
        setOrderByValue(value)
      }
    }
  }, [orderBy])

  return (
    <Dropdown
      leadingIcon={(
        <Icon
          name={IconName.Reorder}
          className="text-white"
        />
      )}
      label={orderByValue?.label ?? 'Sort By'}
      chipClasses="w-48"
      open={dropdownOpen}
      setOpen={setDropdownOpen}
    >
      <ul className="list-style-none px-2">
        {orderByOptions.map((option, index) => (
          <li className="relative px-10 py-1">
            <button
              onClick={() => onSelectOption(option)}
              key={`search-by-filter-${id}-option-${index}`}
            >
              {orderByValue?.value === option.value && (
                <Icon
                  name={IconName.Tick}
                  className="text-accent-secondary absolute left-0"
                />
              )}

              <p
                className={
                  classNames('text-neutral-800', {
                    ['!text-accent-secondary']: orderByValue?.value === option.value
                  })
                }
              >
                {option.label}
              </p>
            </button>
          </li>
        ))}
      </ul>
    </Dropdown>
  )
}

export default SortByFilter