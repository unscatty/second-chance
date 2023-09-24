<script setup lang="ts">
const { isPreviousData } = defineProps<{
  isPreviousData: boolean
}>()

const paginationStore = usePaginationStore()
const { nextPage, previousPage } = paginationStore
const {
  hasNextPage,
  hasPreviousPage,
  paginationRangeMin,
  paginationRangeMax,
  totalResults,
} = storeToRefs(paginationStore)
</script>

<template>
  <nav
    class="py-3 flex items-center justify-between"
    aria-label="Pagination"
  >
    <div class="hidden sm:block">
      <p class="text-sm text-gray-700">
        Showing
        {{ ' ' }}
        <span class="font-medium">{{ paginationRangeMin.toLocaleString() }}</span>
        {{ ' ' }}
        to
        {{ ' ' }}
        <span class="font-medium">{{ paginationRangeMax.toLocaleString() }}</span>
        {{ ' ' }}
        of
        {{ ' ' }}
        <span class="font-medium">{{ totalResults.toLocaleString() }}</span>
        {{ ' ' }}
        results
      </p>
    </div>
    <div class="flex-1 flex justify-between sm:justify-end">
      <a
        href="#"
        :class="{
          'opacity-50 cursor-not-allowed': !hasPreviousPage,
        }"
        class="relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50"
        @click.prevent="previousPage()"
      >
        Previous
      </a>
      <a
        href="#"
        :class="{
          'opacity-50 cursor-not-allowed': !hasNextPage,
        }"
        class="ml-3 relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50"
        @click.prevent="nextPage(isPreviousData)"
      >
        Next
      </a>
    </div>
  </nav>
</template>
