import { type FC } from 'react'
import SortByFilter from './SortByFilter'
import { Container } from '@dentor/ui'
import DateFilter from './DateFilter'
import LocationFilter from './LocationFilter'

interface SearchFiltersProps { }

const SearchFilters: FC<SearchFiltersProps> = () => {
  return (
    <section>
      <Container className="flex items-center justify-between py-12">
        <div className="flex gap-4">
          <DateFilter />
          <LocationFilter />
        </div>

        <SortByFilter />
      </Container>
    </section>
  )
}

export default SearchFilters