'use client'

import { Dropdown, Icon, IconName, TextInput } from '@dentor/ui'
import dayjs from 'dayjs'
import { useState, type FC } from 'react'

interface DateFilterProps { }

const DateFilter: FC<DateFilterProps> = () => {
  const [dropdownOpen, setDropdownOpen] = useState(false)
  const [startDate, setStartDate] = useState<string>()
  const [endDate, setEndDate] = useState<string>()

  return (
    <Dropdown
      leadingIcon={(
        <Icon
          name={IconName.Calendar}
          className="text-white"
        />
      )}
      label="Dates"
      chipClasses="w-48"
      open={dropdownOpen}
      setOpen={setDropdownOpen}
    >
      <div className="">
        <header className="flex items-center justify-center gap-4">
          <TextInput
            value={startDate ?? ''}
            onChange={(e) => setStartDate(e.target.value)}
            placeholder={dayjs().format('DD-MM-YYYY')}
          />
          <TextInput
            value={endDate ?? ''}
            onChange={(e) => setEndDate(e.target.value)}
            placeholder={dayjs().add(1, 'week').format('DD-MM-YYYY')}
          />
        </header>
      </div>
    </Dropdown>
  )
}

export default DateFilter