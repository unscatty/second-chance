import axios, { type AxiosInstance } from 'axios'
import { type Dog as DogType } from '~/types'

interface DogSearchSortBy {
  field: keyof DogType
  order: 'asc' | 'desc'
}

type DogSearchQueryParams = Partial<{
  breeds: string[]
  zipCodes: string[]
  ageMin: number
  ageMax: number
  // Additional query params
  size: number
  from: number
  sort: DogSearchSortBy
}>

interface DogSearchResult {
  resultIds: string[]
  total: number
  next: string | null
  prev: string | null
}

export default class DogService {
  axiosInstance: AxiosInstance = axios.create({
    baseURL: import.meta.env.VITE_DOGS_ENDPOINT,
    url: '/dogs',
    withCredentials: true,
  })

  private sortToString(sort: DogSearchSortBy) {
    return `${sort.field}:${sort.order}`
  }

  async getBreeds() {
    const { data } = await this.axiosInstance.get<string[]>('/breeds')
    return data
  }

  async search(queryParams: DogSearchQueryParams) {
    const { data } = await this.axiosInstance.get<DogSearchResult>('/search', {
      params: {
        ...queryParams,
        sort: queryParams.sort && this.sortToString(queryParams.sort),
      },
    })

    return data
  }
}
