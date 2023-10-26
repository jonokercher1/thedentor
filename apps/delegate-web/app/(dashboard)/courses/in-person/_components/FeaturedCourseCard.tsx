'use client'

import { Button, ButtonVariant, Chip, Icon, IconName } from '@dentor/ui'
import { type FC } from 'react'
import dayjs from 'dayjs'
import advancedFormat from 'dayjs/plugin/advancedFormat'
import Link from 'next/link'

dayjs.extend(advancedFormat)

interface FeaturedCourseCard {
  course: any // TODO: add type from api 
}

const FeaturedCourseCard: FC<FeaturedCourseCard> = ({ course }) => {
  return (
    <article
      className="bg-neutral-700 relative rounded-2xl p-8 md:p-12 lg:p-20 bg-center bg-no-repeat bg-cover"
      style={{
        backgroundImage: `url(${course.previewImage})`
      }}
    >
      <div
        className="bg-gradient-to-r absolute inset-0 from-neutral-650 to-neutral-650/50 rounded-2xl"
      />

      <div className="relative">
        <header>
          <span className="text-accent-primary font-bold text-2xl mb-2 block">Featured Course</span>
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
              label={`${category.value}`}
              className="flex-shrink-0"
              key={`featured-course-${course.id}-category-${category.slug}`}
            />
          ))}
        </section>

        <section>
          <p className="text-neutral-300 font-light">{course.description}</p>
        </section>

        <footer className="flex items-start md:items-center gap-4 mt-12 lg:mt-24 flex-col-reverse md:flex-row">
          <Button variant={ButtonVariant.Primary}>
            <Link href={`/courses/in-person/${course.id}`}>
              <p>View Course</p>
            </Link>
          </Button>

          <Chip
            leadingIcon={( // TODO: replace with gravatar?
              <div className="h-10 w-10 bg-neutral-100 rounded-full" />
            )}
            label={course.dentor.name}
            className="py-3 px-4 mb-4 md:mb-0"
          />
        </footer>
      </div>
    </article>
  )
}

export default FeaturedCourseCard