'use client'

import { Button, ButtonVariant, Icon, IconName } from '@dentor/ui'
import classNames from 'classnames'
import { motion } from 'framer-motion'
import { useRouter } from 'next/navigation'
import { type FC } from 'react'

interface SearchInputProps {
  active?: boolean
  value: string
  onChange: (value: string) => void
}

const inputVariations = {
  open: {
    width: 500,
  },
  closed: {
    width: 0
  }
}

const buttonVariants = {
  open: {
    backgroundColor: '#60D1FA',
    scale: 1.1
  },
  closed: {
    backgroundColor: '#11243E',
    scale: 1
  }
}

const SearchInput: FC<SearchInputProps> = ({ active, value, onChange }) => {
  const iconClasses = classNames(
    'text-white h-8 w-8 transition-colors duration-200',
    {
      'text-neutral-800': active
    }
  )

  const router = useRouter()

  const onNavigate = () => {
    if (active) {
      router.back()
    } else {
      router.push('/courses/in-person/search')
    }
  }

  return (
    <div className="flex items-center relative">
      <motion.div
        className="w-0 bg-neutral-700 absolute right-4 rounded-full"
        variants={inputVariations}
        animate={active ? 'open' : 'closed'}
        transition={{
          duration: .3,
          type: 'spring'
        }}
      >
        <input
          type="text"
          className="w-full bg-transparent p-3.5 px-8 text-white outline-none placeholder-white font-light"
          placeholder="Search keyword, Course or Dentor"
          value={value}
          onChange={(e) => onChange(e.target.value)}
        />
      </motion.div>

      <motion.div
        variants={buttonVariants}
        animate={active ? 'open' : 'closed'}
        className="rounded-full relative flex items-center"
      >
        <Button
          variant={ButtonVariant.Transparent}
          className="h-14 w-14 bg-neutral-800 transition-all relative"
          onClick={onNavigate}
        >
          <Icon
            name={IconName.Search}
            className={iconClasses}
          />
        </Button>
      </motion.div>
    </div>
  )
}

export default SearchInput