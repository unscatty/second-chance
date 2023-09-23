import { acceptHMRUpdate, defineStore } from 'pinia'
import { type DogSearchQueryParams } from '~/types'

type DogSearchFilterParams = Omit<DogSearchQueryParams, 'from' | 'size'>

export const useFiltersStore = defineStore('filters', () => {
  const filters = ref<DogSearchFilterParams>({
    breeds: [],
    zipCodes: [],
    ageMin: 0,
    ageMax: 30,
    sort: {
      field: 'breed',
      direction: 'asc',
    },
  })

  const resultSize = ref(20)

  const setBreeds = (breeds: string[]) => {
    filters.value.breeds = breeds
  }

  const removeBreed = (breedIndex: number) => {
    filters.value.breeds?.splice(breedIndex, 1)
  }

  return {
    filters,
    setBreeds,
    removeBreed,
    resultSize
  }
})

if (import.meta.hot)
  import.meta.hot.accept(acceptHMRUpdate(useFiltersStore as any, import.meta.hot))
