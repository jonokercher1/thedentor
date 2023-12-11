'use client'

import { Button, ButtonVariant, Chip, Icon, IconName } from '@dentor/ui'
import { type FC } from 'react'
import DentorChip from '@/app/(dashboard)/(pages)/courses/_components/DentorChip'
import CourseDateTag from '@/app/(dashboard)/(pages)/courses/in-person/_components/CourseDateTag'

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
          <CourseDateTag
            startDate={course.startDate}
            endDate={course.endDate}
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
            {/* TODO: need to support /video too */}
            <Button variant={ButtonVariant.Primary} className="text-center" href={`/courses/in-person/${course.id}`}>
              <p>View Course</p>
            </Button>
          </div>
        )}
      </footer>
    </article>
  )
}

export default CourseCard