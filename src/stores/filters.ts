import { acceptHMRUpdate, defineStore } from 'pinia'
import { type DogSearchFilterQueryParams, type DogSearchSortBy } from '~/types'

export const useFiltersStore = defineStore('filters', () => {
  const filters = ref<DogSearchFilterQueryParams>({
    breeds: [],
    zipCodes: [],
    ageMin: 0,
    ageMax: 30,
  })

  const sortBy = ref<DogSearchSortBy>({
    field: 'breed',
    direction: 'asc',
  })

  const queryParams = computed(() => {
    return {
      ...filters.value,
      sort: sortBy.value,
    }
  })

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
    sortBy,
    queryParams,
  }
})

if (import.meta.hot)
  import.meta.hot.accept(
    acceptHMRUpdate(useFiltersStore as any, import.meta.hot)
  )
