'use client'

import { Dropdown, Icon, IconName } from '@dentor/ui'
import { useState, type FC } from 'react'

interface LocationFilterProps {
}

const LocationFilter: FC<LocationFilterProps> = () => {
  const [dropdownOpen, setDropdownOpen] = useState(false)
  return (
    <Dropdown
      leadingIcon={(
        <Icon
          name={IconName.Location}
          className="text-white"
        />
      )}
      label="Location"
      chipClasses="w-48"
      open={dropdownOpen}
      setOpen={setDropdownOpen}
    >

    </Dropdown>
  )
}

export default LocationFilter