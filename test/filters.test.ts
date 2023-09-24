import { beforeEach, describe, expect, it } from 'vitest'
import { useFiltersStore } from '~/stores/filters'

describe('FiltersStore', () => {
  beforeEach(() => {
    // creates a fresh pinia and make it active so it's automatically picked
    // up by any useStore() call without having to pass it to it:
    // `useStore(pinia)`
    setActivePinia(createPinia())
  })

  it('should be able to set the breeds filter', () => {
    const filtersStore = useFiltersStore()

    expect(filtersStore.filters.breeds).toEqual([])

    filtersStore.setBreeds(['Labrador Retriever', 'Golden Retriever'])

    expect(filtersStore.filters.breeds).toEqual([
      'Labrador Retriever',
      'Golden Retriever',
    ])
  })

  it('should be able to remove a breed from the breeds filter', () => {
    const filtersStore = useFiltersStore()

    filtersStore.setBreeds(['Labrador Retriever', 'Golden Retriever'])

    expect(filtersStore.filters.breeds).toEqual([
      'Labrador Retriever',
      'Golden Retriever',
    ])

    filtersStore.removeBreed(0)

    expect(filtersStore.filters.breeds).toEqual(['Golden Retriever'])
  })

  it('should be able to set the sort order', () => {
    const filtersStore = useFiltersStore()

    expect(filtersStore.sortBy).toEqual({
      field: 'breed',
      direction: 'asc',
    })

    filtersStore.sortBy = {
      field: 'age',
      direction: 'desc',
    }

    expect(filtersStore.sortBy).toEqual({
      field: 'age',
      direction: 'desc',
    })
  })

  it('should compute the query params correctly', () => {
    const filtersStore = useFiltersStore()

    filtersStore.filters = {
      breeds: ['Labrador Retriever', 'Golden Retriever'],
      zipCodes: ['12345', '54321'],
      ageMin: 0,
      ageMax: 30,
    }

    filtersStore.sortBy = {
      field: 'age',
      direction: 'desc',
    }

    expect(filtersStore.queryParams).toEqual({
      breeds: ['Labrador Retriever', 'Golden Retriever'],
      zipCodes: ['12345', '54321'],
      ageMin: 0,
      ageMax: 30,
      sort: {
        field: 'age',
        direction: 'desc',
      },
    })
  })
})
