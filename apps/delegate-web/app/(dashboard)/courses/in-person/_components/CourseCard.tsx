import { Chip } from '@dentor/ui'
import { type FC } from 'react'
import dayjs from 'dayjs'
import advancedFormat from 'dayjs/plugin/advancedFormat'

dayjs.extend(advancedFormat)

interface CourseCardProps {
  course: any // TODO: add type from api 
}

const CourseCard: FC<CourseCardProps> = ({ course }) => {
  return (
    <article className="bg-neutral-700 rounded-2xl p-8">
      <header>
        <h3 className="text-white font-bold text-3xl">{course.name}</h3>
      </header>

      <section className="flex gap-3 my-5">
        {course.startDate && course.endDate && (
          <Chip
            label={`${dayjs(course.startDate).format('Do MMM')} - ${dayjs(course.endDate).format('Do MMM')}`}
          />
        )}

        <Chip
          label={`${course.cpdValue} Hours CPD`}
        />

        {!!course.categories?.length && course.categories.map((category: any) => (
          <Chip label={`${category.value}`} />
        ))}
      </section>

      <section>
        <p className="text-neutral-300 font-light">{course.description}</p>
      </section>

      <footer className="flex items-start justify-between mt-12">
        <Chip
          leadingIcon={( // TODO: replace with avatar
            <div className="h-6 w-6 bg-neutral-100 rounded-full" />
          )}
          label={course.dentor.name}
        />
      </footer>
    </article>
  )
}

export default CourseCard