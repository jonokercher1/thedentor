export interface CurrentUser {
  id: string
  email: string
  name: string
  phone: string
  gdcNumber: string
  role: 'Dentist' | 'Dentor'
}