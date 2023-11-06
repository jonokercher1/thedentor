import { CourseCategory } from '@/types/api/course/category/course-category'
import { Dentor } from '@/types/api/dentor/dentor'

export enum CourseType {
  Video = 'Video',
  InPerson = 'InPerson'
}

export interface Course {
  id: string
  name: string
  description: string
  cpdValue: number
  startDate: string
  endDate: string
  dentor: Dentor
  categories: CourseCategory[]
}