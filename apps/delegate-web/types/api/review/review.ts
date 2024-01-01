import { Dentor } from '../dentor/dentor';

export interface Review {
  id: string
  title: string
  content: string
  rating: number
  dentor: Dentor
}