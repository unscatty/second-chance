import { useQuery } from '@tanstack/vue-query'
import dogService from '~/services/dog.service'

export const useDogSearch = (key: string) => {
  const { filters, sortBy } = storeToRefs(useFiltersStore())
  const { page, resultSize: paginationResultSize } = storeToRefs(
    usePaginationStore()
  )

  return useQuery({
    queryKey: [key, page, filters, sortBy],
    queryFn: () =>
      dogService.search({
        ...filters.value,
        sort: sortBy.value,
        from: (page.value - 1) * paginationResultSize.value,
        size: paginationResultSize.value,
      }),
    keepPreviousData: true,
    refetchOnWindowFocus: false,
    staleTime: 60 * 1000 * 5, // 5 minutes to invalidate cache
  })
}
