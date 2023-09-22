import axios, { type AxiosInstance } from 'axios'
import { type Dog as DogType, type Match as DogMatch } from '~/types'

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

  async searchIds(queryParams: DogSearchQueryParams) {
    const { data } = await this.axiosInstance.get<DogSearchResult>('/search', {
      params: {
        ...queryParams,
        sort: queryParams.sort && this.sortToString(queryParams.sort),
      },
    })

    return data
  }

  async getDogsByIds(dogIds: string[]) {
    if (!dogIds.length) {
      return []
    }

    if (dogIds.length > 100) {
      throw new Error('Cannot fetch more than 100 dogs at a time')
    }

    const { data: dogs } = await this.axiosInstance.post<DogType[]>('/', dogIds)

    return dogs
  }

  async search(queryParams: DogSearchQueryParams) {
    const { resultIds, ...rest } = await this.searchIds(queryParams)
    const dogs = await this.getDogsByIds(resultIds)

    return {
      dogs,
      ...rest,
    }
  }

  async getMatchId(dogIds: string[]) {
    const { data } = await this.axiosInstance.post<DogMatch>('/match', dogIds)

    return data
  }

  async match(dogIds: string[]) {
    const { match } = await this.getMatchId(dogIds)
    const matchedDogs = await this.getDogsByIds([match])

    return matchedDogs[0]
  }
}
