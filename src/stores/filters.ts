import { acceptHMRUpdate, defineStore } from 'pinia'
import { type DogSearchQueryParams } from '~/types'

type DogSearchFilterParams = Omit<DogSearchQueryParams, 'from' | 'size'>

export const useFiltersStore = defineStore('filters', () => {
  const filters = reactive<DogSearchFilterParams>({
    breeds: [],
    zipCodes: [],
    ageMin: 0,
    ageMax: 20,
    sort: {
      field: 'breed',
      direction: 'asc',
    },
  })

  return {
    filters,
  }
})

if (import.meta.hot)
  import.meta.hot.accept(acceptHMRUpdate(useFiltersStore as any, import.meta.hot))
