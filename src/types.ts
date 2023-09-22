import { type ViteSSGContext } from 'vite-ssg'

export type UserModule = (ctx: ViteSSGContext) => void

export interface Dog {
  id: string
  img: string
  name: string
  age: number
  zip_code: string
  breed: string
}

export interface Location {
  zip_code: string
  latitude: number
  longitude: number
  city: string
  state: string
  county: string
}

export interface Coordinates {
  lat: number
  lon: number
}

export interface Match {
  match: string
}

export interface DogSearchSortBy {
  field: keyof Pick<Dog, 'age' | 'breed' | 'name'>
  direction: 'asc' | 'desc'
}

export type DogSearchQueryParams = Partial<{
  breeds: string[]
  zipCodes: string[]
  ageMin: number
  ageMax: number
  // Additional query params
  size: number
  from: number
  sort: DogSearchSortBy
}>