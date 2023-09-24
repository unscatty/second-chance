/* eslint-disable curly */
import { type AxiosInstance } from 'axios'
import authService from './auth.service'
import {
  type Match as DogMatch,
  type DogSearchQueryParams,
  type DogSearchSortBy,
  type DogBase as DogWithZipCode,
  type Dog as DogType,
  type DogSearchResult,
  type Location,
} from '~/types'

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

    const { data: dogs } = await this.axiosInstance.post<DogWithZipCode[]>(
      '/dogs',
      dogIds
    )

    return dogs
  }

  getLocations = async (zipCodes: string[]) => {
    const { data } = await this.axiosInstance.post<Array<Location | null>>(
      '/locations',
      zipCodes
    )
    return data
  }

  mergeDogsWithLocations = (
    dogs: DogWithZipCode[],
    locations: (Location | null)[]
  ): DogType[] => {
    const locationMap = locations.reduce<Record<string, Location>>(
      (acc, location) => {
        if (location && location.zip_code) {
          acc[location.zip_code] = location
        }

        return acc
      },
      {}
    )

    return dogs.map((dog) => ({
      ...dog,
      location: locationMap[dog.zip_code],
    }))
  }

  async search(queryParams: DogSearchQueryParams) {
    const { resultIds, ...rest } = await this.searchIds(queryParams)
    const dogsWithZipCodes = await this.getDogsByIds(resultIds)

    const zipCodes = dogsWithZipCodes.map((dog) => dog.zip_code)
    const dogLocations = await this.getLocations(zipCodes)

    const dogs = this.mergeDogsWithLocations(dogsWithZipCodes, dogLocations)

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

  async match(dogIds: string[]): Promise<DogType> {
    const { match } = await this.getMatchId(dogIds)
    const matchedDog = (await this.getDogsByIds([match]))[0]

    const zipCode = matchedDog.zip_code

    const location = (await this.getLocations([zipCode]))[0]

    return {
      ...matchedDog,
      location,
    }
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
