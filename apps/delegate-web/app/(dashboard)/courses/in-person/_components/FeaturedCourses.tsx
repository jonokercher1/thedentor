'use client'

import { type FC } from 'react'
import dayjs from 'dayjs'
import FeaturedCourseCard from './FeaturedCourseCard'
import { Carousel } from '@dentor/ui'

// TODO: get from api
const featuredCourses = [
  {
    id: '123',
    name: 'Polishing The Anterior Composite Restoration',
    description: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Placeat id aperiam perferendis cum recusandae non dignissimos tempora doloremque accusantium ullam iusto, harum expedita doloribus cupiditate saepe exercitationem consequuntur sint, earum labore quae distinctio quasi nobis! Aliquid vel eum fugit. Ab!',
    cpdValue: 12,
    startDate: new Date(),
    endDate: dayjs().add(2, 'days').toDate(),
    previewImage: 'https://images.unsplash.com/photo-1468493858157-0da44aaf1d13',
    dentor: {
      name: 'Jason Smithson'
    },
    categories: [
      { slug: 'restorative-dentistry', value: 'Restorative Dentistry' },
    ]
  },
  {
    id: '123',
    name: 'Polishing The Anterior Composite Restoration',
    description: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Placeat id aperiam perferendis cum recusandae non dignissimos tempora doloremque accusantium ullam iusto, harum expedita doloribus cupiditate saepe exercitationem consequuntur sint, earum labore quae distinctio quasi nobis! Aliquid vel eum fugit. Ab!',
    cpdValue: 12,
    startDate: new Date(),
    endDate: dayjs().add(2, 'days').toDate(),
    previewImage: 'https://images.unsplash.com/photo-1468493858157-0da44aaf1d13',
    dentor: {
      name: 'Jason Smithson'
    },
    categories: [
      { slug: 'restorative-dentistry', value: 'Restorative Dentistry' },
    ]
  },
  {
    id: '1234',
    name: 'Polishing The Anterior Composite Restoration',
    description: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Placeat id aperiam perferendis cum recusandae non dignissimos tempora doloremque accusantium ullam iusto, harum expedita doloribus cupiditate saepe exercitationem consequuntur sint, earum labore quae distinctio quasi nobis! Aliquid vel eum fugit. Ab!',
    cpdValue: 12,
    startDate: new Date(),
    endDate: dayjs().add(2, 'days').toDate(),
    dentor: {
      name: 'Jason Smithson'
    },
    categories: [
      { slug: 'restorative-dentistry', value: 'Restorative Dentistry' }
    ]
  },
  // {
  //   id: '12345',
  //   name: 'Polishing The Anterior Composite Restoration',
  //   description: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Placeat id aperiam perferendis cum recusandae non dignissimos tempora doloremque accusantium ullam iusto, harum expedita doloribus cupiditate saepe exercitationem consequuntur sint, earum labore quae distinctio quasi nobis! Aliquid vel eum fugit. Ab!',
  //   cpdValue: 12,
  //   startDate: new Date(),
  //   endDate: dayjs().add(2, 'days').toDate(),
  //   owned: false,
  //   dentor: {
  //     name: 'Jason Smithson'
  //   },
  //   categories: [
  //     { slug: 'restorative-dentistry', value: 'Restorative Dentistry' }
  //   ]
  // },
  // {
  //   id: '123456',
  //   name: 'Polishing The Anterior Composite Restoration',
  //   description: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Placeat id aperiam perferendis cum recusandae non dignissimos tempora doloremque accusantium ullam iusto, harum expedita doloribus cupiditate saepe exercitationem consequuntur sint, earum labore quae distinctio quasi nobis! Aliquid vel eum fugit. Ab!',
  //   cpdValue: 12,
  //   startDate: new Date(),
  //   endDate: dayjs().add(2, 'days').toDate(),
  //   dentor: {
  //     name: 'Jason Smithson'
  //   },
  //   categories: [
  //     { slug: 'restorative-dentistry', value: 'Restorative Dentistry' }
  //   ]
  // },
]

const FeaturedCourses: FC = () => {
  return (
    <section className="py-12">
      <div>
        <Carousel
          pagination
          loop
          gap={50}
          items={
            featuredCourses.map((course) => (
              <FeaturedCourseCard
                key={`featured-courses-course-${course.id}`}
                course={course}
              />
            ))
          }
        />
      </div>
    </section>
  )
}

export default FeaturedCourses