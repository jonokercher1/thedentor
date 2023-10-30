import { type FC } from 'react'
import CourseCard from './CourseCard'
import dayjs from 'dayjs'
import TheDentorPremiumCard from '@/app/_components/TheDentorPremiumCard'

// TODO: get from api
const upcomingCourses = [
  {
    id: '123',
    name: 'Polishing The Anterior Composite Restoration',
    description: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Placeat id aperiam perferendis cum recusandae non dignissimos tempora doloremque accusantium ullam iusto, harum expedita doloribus cupiditate saepe exercitationem consequuntur sint, earum labore quae distinctio quasi nobis! Aliquid vel eum fugit. Ab!',
    cpdValue: 12,
    startDate: new Date(),
    endDate: dayjs().add(2, 'days').toDate(),
    owned: false,
    dentor: {
      name: 'Jason Smithson'
    },
    categories: [
      { slug: 'restorative-dentistry', value: 'Restorative Dentistry' },
      { slug: 'restorative-dentistry', value: 'Restorative Dentistry' },
      { slug: 'restorative-dentistry', value: 'Restorative Dentistry' },
      { slug: 'restorative-dentistry', value: 'Restorative Dentistry' },
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
    owned: true,
    dentor: {
      name: 'Jason Smithson'
    },
    categories: [
      { slug: 'restorative-dentistry', value: 'Restorative Dentistry' }
    ]
  },
  {
    id: '12345',
    name: 'Polishing The Anterior Composite Restoration',
    description: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Placeat id aperiam perferendis cum recusandae non dignissimos tempora doloremque accusantium ullam iusto, harum expedita doloribus cupiditate saepe exercitationem consequuntur sint, earum labore quae distinctio quasi nobis! Aliquid vel eum fugit. Ab!',
    cpdValue: 12,
    startDate: new Date(),
    endDate: dayjs().add(2, 'days').toDate(),
    owned: false,
    dentor: {
      name: 'Jason Smithson'
    },
    categories: [
      { slug: 'restorative-dentistry', value: 'Restorative Dentistry' }
    ]
  },
  {
    id: '123456',
    name: 'Polishing The Anterior Composite Restoration',
    description: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Placeat id aperiam perferendis cum recusandae non dignissimos tempora doloremque accusantium ullam iusto, harum expedita doloribus cupiditate saepe exercitationem consequuntur sint, earum labore quae distinctio quasi nobis! Aliquid vel eum fugit. Ab!',
    cpdValue: 12,
    startDate: new Date(),
    endDate: dayjs().add(2, 'days').toDate(),
    owned: true,
    dentor: {
      name: 'Jason Smithson'
    },
    categories: [
      { slug: 'restorative-dentistry', value: 'Restorative Dentistry' }
    ]
  },
]

const UpcomingCourses: FC = () => {
  return (
    <section className="py-12">
      <header>
        <h2 className="text-white text-3xl mb-12">Upcoming Courses</h2>
      </header>

      <div className="grid lg:grid-cols-3 lg:gap-20">
        <section className="col-span-2 flex flex-col gap-12">
          {upcomingCourses.map((course, index) => {
            if (index === 2) {
              return (
                <>
                  <div className="lg:hidden">
                    <TheDentorPremiumCard className="h-[400px]" />
                  </div>

                  <CourseCard
                    key={`upcoming-courses-course-${course.id}`}
                    course={course}
                  />
                </>

              )
            } else {
              return (
                <CourseCard
                  key={`upcoming-courses-course-${course.id}`}
                  course={course}
                />
              )
            }

          })}
        </section>

        <aside className="hidden lg:block">
          <TheDentorPremiumCard className="h-[800px] top-12 sticky" />
        </aside>
      </div>
    </section>
  )
}

export default UpcomingCourses