import { acceptHMRUpdate, defineStore } from 'pinia'
import { UnwrapRef } from 'vue'
import { type DogSearchResult } from '~/types'

export const usePaginationStore = defineStore('pagination', () => {
  const page = ref(1)
  const resultSize = ref(20)

  const lastPaginationResult = ref<Omit<DogSearchResult, 'resultIds'>>({
    total: 0,
    next: null,
    prev: null,
  })

  const handlePaginationResult = (
    result: UnwrapRef<typeof lastPaginationResult>
  ) => {
    lastPaginationResult.value = result
  }

  const paginationFrom = computed(() => {
    return (page.value - 1) * resultSize.value
  })

  const paginationRangeMin = computed(() => {
    if (lastPaginationResult.value.total === 0) {
      return 0
    }

    return paginationFrom.value + 1
  })

  const paginationRangeMax = computed(() => {
    return Math.min(
      lastPaginationResult.value.total,
      paginationRangeMin.value + resultSize.value - 1
    )
  })

  const totalPageCount = computed(() => {
    return Math.ceil(lastPaginationResult.value.total / resultSize.value)
  })

  const totalResults = computed(() => {
    return lastPaginationResult.value.total
  })

  const hasNextPage = computed(() => {
    return totalResults.value > paginationRangeMax.value && Boolean(lastPaginationResult.value.next)
  })

  const hasPreviousPage = computed(() => {
    return Boolean(lastPaginationResult.value.prev) && page.value > 1
  })

  const nextPage = (isPreviousData: boolean) => {
    if (hasNextPage.value && !isPreviousData) {
      page.value = page.value + 1
    }
  }

  const previousPage = () => {
    if (hasPreviousPage.value) {
      page.value = Math.max(page.value - 1, 1)
    }
  }

  const setPage = (newPage: number) => {
    page.value = newPage
  }

  const reset = () => {
    page.value = 1
  }

  return {
    page,
    resultSize,
    nextPage,
    previousPage,
    setPage,
    reset,
    handlePaginationResult,
    totalPageCount,
    hasNextPage,
    hasPreviousPage,
    lastPaginationResult,
    paginationRangeMin,
    paginationRangeMax,
    totalResults,
    paginationFrom,
  }
})

if (import.meta.hot)
  import.meta.hot.accept(
    acceptHMRUpdate(usePaginationStore as any, import.meta.hot)
  )
