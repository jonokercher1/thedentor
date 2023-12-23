export interface CurrentUser {
  id: string
  email: string
  name: string
  phone: string
  gdcNumber: string
  onboardingState: 'not-started' | 'incomplete' | 'complete'
  role: 'Dentist' | 'Dentor'
}