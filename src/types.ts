import { type ViteSSGContext } from 'vite-ssg'

export type UserModule = (ctx: ViteSSGContext) => void

export interface DogBase {
  id: string
  img: string
  name: string
  age: number
  zip_code: string
  breed: string
}

export type Dog = Omit<DogBase, 'zip_code'> & {
  location: Location
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

export interface DogSearchFilterQueryParams {
  breeds: string[]
  zipCodes: string[]
  ageMin: number
  ageMax: number
}

export type DogSearchQueryParams = Partial<
  DogSearchFilterQueryParams & {
    // Additional query params
    size: number
    from: number
    sort: DogSearchSortBy
  }
>

export interface DogSearchResult {
  resultIds: string[]
  total: number
  next: string | null
  prev: string | null
}
