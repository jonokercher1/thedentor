import { Chip } from '@dentor/ui'
import dayjs from 'dayjs'
import advancedFormat from 'dayjs/plugin/advancedFormat'
import { type FC } from 'react'

dayjs.extend(advancedFormat)

interface CourseDateTagProps {
  startDate: Date
  endDate: Date
}

const CourseDateTag: FC<CourseDateTagProps> = ({ startDate, endDate }) => (
  <Chip
    label={`${dayjs(startDate).format('Do MMM')} - ${dayjs(endDate).format('Do MMM')}`}
    className="flex-shrink-0"
  />
)

export default CourseDateTag