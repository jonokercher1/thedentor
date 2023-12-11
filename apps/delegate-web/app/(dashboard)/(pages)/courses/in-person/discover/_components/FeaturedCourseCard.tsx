'use client'

import { Button, ButtonVariant, Chip } from '@dentor/ui'
import { type FC } from 'react'
import CourseDateTag from '@/app/(dashboard)/(pages)/courses/in-person/_components/CourseDateTag'
import { CourseCategory } from '@/types/api/course/category/course-category'
import { Course } from '@/types/api/course/course'

interface FeaturedCourseCard {
  course: Course
}

const FeaturedCourseCard: FC<FeaturedCourseCard> = ({ course }) => {
  return (
    <article
      className="bg-neutral-700 relative rounded-2xl p-8 md:p-12 lg:p-20 bg-center bg-no-repeat bg-cover"
      style={{
        // TODO: add this to the api
        backgroundImage: 'url(https://source.unsplash.com/random)'
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
            <CourseDateTag
              startDate={course.startDate}
              endDate={course.endDate}
            />
          )}

          <Chip
            label={`${course.cpdValue} Hours CPD`}
            className="flex-shrink-0"
          />

          {!!course.categories?.length && course.categories.map((category: CourseCategory) => (
            <Chip
              label={`${category.label}`}
              className="flex-shrink-0"
              key={`featured-course-${course.id}-category-${category.slug}`}
            />
          ))}
        </section>

        <section>
          <p className="text-neutral-300 font-light">{course.description}</p>
        </section>

        <footer className="flex items-start md:items-center gap-4 mt-12 lg:mt-24 flex-col-reverse md:flex-row">
          <Button variant={ButtonVariant.Primary} href={`/courses/in-person/${course.id}`}>
            <p>View Course</p>
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