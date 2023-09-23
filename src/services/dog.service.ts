/* eslint-disable curly */
import { type AxiosInstance } from 'axios'
import authService from './auth.service'
import {
  type Match as DogMatch,
  type DogSearchQueryParams,
  type DogSearchSortBy,
  type Dog as DogType,
} from '~/types'

interface DogSearchResult {
  resultIds: string[]
  total: number
  next: string | null
  prev: string | null
}

export class DogService {
  private axiosInstance: AxiosInstance

  constructor(axiosInstance: AxiosInstance) {
    this.axiosInstance = axiosInstance
  }

  private sortToString(sort: DogSearchSortBy) {
    return `${sort.field}:${sort.direction}`
  }

  async getBreeds() {
    const { data } = await this.axiosInstance.get<string[]>('/dogs/breeds')
    return data
  }

  async searchIds(queryParams: DogSearchQueryParams) {
    const { data } = await this.axiosInstance.get<DogSearchResult>(
      '/dogs/search',
      {
        params: {
          ...queryParams,
          sort: queryParams.sort && this.sortToString(queryParams.sort),
        },
      }
    )

    return data
  }

  async getDogsByIds(dogIds: string[]) {
    if (!dogIds.length) {
      return []
    }

    if (dogIds.length > 100) {
      throw new Error('Cannot fetch more than 100 dogs at a time')
    }

    const { data: dogs } = await this.axiosInstance.post<DogType[]>(
      '/dogs',
      dogIds
    )

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
    const { data } = await this.axiosInstance.post<DogMatch>(
      '/dogs/match',
      dogIds
    )

    return data
  }

  async match(dogIds: string[]) {
    const { match } = await this.getMatchId(dogIds)
    const matchedDogs = await this.getDogsByIds([match])

    return matchedDogs[0]
  }

  async fetchNextPage(nextPageUrl: string) {
    const {
      data: { resultIds, ...rest },
    } = await this.axiosInstance.get<DogSearchResult>(nextPageUrl)
    const dogs = await this.getDogsByIds(resultIds)

    return {
      dogs,
      ...rest,
    }
  }
}

export default new DogService(authService.instance)
