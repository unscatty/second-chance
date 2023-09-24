<script setup lang="ts">
// Filters and Pagination
const { sortBy } = storeToRefs(useFiltersStore())
const paginationStore = usePaginationStore()
const { handlePaginationResult, reset: resetPagination } = paginationStore

const {
  isLoading,
  data: dogsData,
  isFetching,
  isPreviousData,
  isError,
  failureCount,
} = useDogSearch('dogs')

watch(dogsData, () => {
  if (dogsData.value) {
    handlePaginationResult(dogsData.value)
  }
})

// Go back to page 1 if 'sort by' changes
watchDeep(sortBy, resetPagination)
</script>

<template>
  <div class="bg-gray-50">
    <Navbar />

    <div>
      <main>
        <!-- Hero section -->
        <Hero />

        <Filters class="sticky top-16 z-4 bg-white" />

        <!-- Dogs grid -->
        <section
          aria-labelledby="products-heading"
          class="max-w-2xl mx-auto pt-4 pb-4 px-4 sm:px-6 lg:max-w-7xl lg:px-8"
        >
          <h2 id="products-heading" class="sr-only">Dogs</h2>

          <!-- Pagination Top -->
          <Pagination class="mb-2" :is-previous-data="isPreviousData" />

          <!-- Loader -->
          <div
            v-show="isLoading || isFetching"
            class="w-full flex justify-center items-center h-64 min-h-64"
          >
            <div
              class="w-32 h-32 border-8 sm:w-64 sm:h-64 sm:border-16 border-dashed rounded-full animate-spin border-violet-400 dark:border-white"
            />
          </div>

          <!-- Error -->
          <ErrorAlert v-if="isError" :attempts="failureCount" />

          <div
            v-show="dogsData?.dogs && !isLoading && !isFetching"
            class="grid grid-cols-1 gap-y-10 sm:grid-cols-2 gap-x-6 lg:grid-cols-3 xl:grid-cols-4 xl:gap-x-8"
          >
            <button
              v-for="dog in dogsData?.dogs"
              :key="dog.id"
              type="button"
              class="group"
            >
              <DogCard :dog="dog" />
              <!-- <FavoriteDogCard :dog="dog" /> -->
            </button>
          </div>

          <!-- Pagination Bottom -->
          <Pagination class="mt-8" :is-previous-data="isPreviousData" />
        </section>
      </main>

      <!-- Footer -->
      <Footer />
    </div>
  </div>
</template>
