import { CourseCategory } from '@/types/api/course/category/course-category'

export enum CourseType {
  Video = 'Video',
  InPerson = 'InPerson'
}

// TODO: replace with full dentor object when api is implemented
interface CourseDentor {
  id: string
  name: string
}

export interface Course {
  id: string
  name: string
  description: string
  cpdValue: number
  startDate: string
  endDate: string
  dentor: CourseDentor
  categories: CourseCategory[]
}