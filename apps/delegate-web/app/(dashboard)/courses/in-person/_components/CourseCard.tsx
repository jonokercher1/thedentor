'use client'

import { Button, ButtonVariant, Chip, Icon, IconName } from '@dentor/ui'
import { type FC } from 'react'
import dayjs from 'dayjs'
import advancedFormat from 'dayjs/plugin/advancedFormat'
import DentorChip from '@/app/(dashboard)/courses/_components/DentorChip'

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

      <section className="flex gap-3 my-5 flex-wrap">
        {course.startDate && course.endDate && (
          <Chip
            label={`${dayjs(course.startDate).format('Do MMM')} - ${dayjs(course.endDate).format('Do MMM')}`}
            className="flex-shrink-0"
          />
        )}

        <Chip
          label={`${course.cpdValue} Hours CPD`}
          className="flex-shrink-0"
        />

        {!!course.categories?.length && course.categories.map((category: any) => (
          <Chip
            key={`course-${course.id}-category-${category.slug}`}
            label={`${category.value}`}
            className="flex-shrink-0"
          />
        ))}
      </section>

      <section>
        <p className="text-neutral-300 font-light">{course.description}</p>
      </section>

      <footer className="flex items-start lg:items-center justify-between mt-12 flex-col lg:flex-row">
        <DentorChip dentor={course.dentor} />

        {course.owned && (
          <div className="flex flex-col lg:flex-row items-stretch lg:items-center w-full lg:w-auto gap-4 mt-12 lg:mt-0">
            <Button variant={ButtonVariant.Primary} outlined className="flex items-center justify-center gap-3">
              <Icon name={IconName.QrCode} />
              <p>View Ticket</p>
            </Button>
            <Button variant={ButtonVariant.Primary}>
              <p>View Course</p>
            </Button>
          </div>
        )}
      </footer>
    </article>
  )
}

export default CourseCard