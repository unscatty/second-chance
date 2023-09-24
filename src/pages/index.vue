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

// ==== Favorites ====
const favoriteDogsStore = useFavoriteDogsStore()

const isFavoritesModalOpen = ref(false)
</script>

<template>
  <div class="bg-gray-50">
    <div sticky top-0 z-5>
      <header class="relative">
        <nav aria-label="Top">
          <!-- Secondary navigation -->
          <div class="bg-white min-w-full z-5">
            <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div class="border-b border-gray-200">
                <div class="h-16 flex items-center justify-between">
                  <!-- Logo (lg+) -->
                  <div
                    class="hidden lg:flex lg:items-center justify-start gap-2"
                  >
                    <a href="/" class="text-gray-9">
                      <span class="sr-only">Second Chance</span>
                      <DogIcon />
                    </a>
                    <p class="text-center">
                      <span class="text-xl font-black text-gray-9 uppercase">
                        Second Chance
                      </span>
                    </p>
                  </div>

                  <!-- Logo (lg-) -->
                  <a href="/" class="lg:hidden text-gray-9">
                    <span class="sr-only">Second Chance</span>
                    <DogIcon />
                  </a>

                  <div class="flex-1 flex items-center justify-end">
                    <div class="flex items-center lg:ml-8">
                      <div class="flex space-x-8">
                        <div class="flex">
                          <a
                            href="#"
                            class="-m-2 p-2 text-gray-400 hover:text-gray-500"
                          >
                            <span class="sr-only">Account</span>
                            <div
                              class="i-heroicons:user-20-solid w-6 h-6"
                              aria-hidden="true"
                            />
                          </a>
                        </div>
                      </div>

                      <!-- Separator -->
                      <span
                        class="mx-4 h-6 w-px bg-gray-200 lg:mx-6"
                        aria-hidden="true"
                      />

                      <div class="flow-root">
                        <button
                          type="button"
                          class="group -m-2 p-2 flex items-center justify-around gap-2"
                          @click="isFavoritesModalOpen = true"
                        >
                          <div
                            class="i-heroicons:heart flex-shrink-0 h-6 w-6 text-gray-400"
                            group-hover="i-heroicons-heart-20-solid h-6 w-6 text-gray-500"
                            aria-hidden="true"
                          />
                          <span class="sr-only">favorite dogs</span>
                          <span class="text-gray-400 group-hover:text-gray-500">
                            {{
                              favoriteDogsStore.totalFavorites > 0
                                ? favoriteDogsStore.totalFavorites
                                : ''
                            }}
                          </span>
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </nav>
      </header>
    </div>

    <FavoritesModal v-model:is-open="isFavoritesModalOpen" />

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
