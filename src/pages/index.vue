<script setup lang="ts">
// Filters and Pagination
const { sortBy } = storeToRefs(useFiltersStore())
const paginationStore = usePaginationStore()
const { handlePaginationResult, reset: resetPagination } = paginationStore

const footerNavigation = {
  products: [
    { name: 'Fidelidad', href: '#' },
    { name: 'Descerebración', href: '#' },
    { name: 'Abaldonamiento', href: '#' },
    { name: 'Increíblemente', href: '#' },
    { name: 'Bateaguas', href: '#' },
  ],
  company: [
    { name: 'Batanear', href: '#' },
    { name: 'Batanear', href: '#' },
    { name: 'Descentralizador', href: '#' },
    { name: 'Descercar', href: '#' },
    { name: 'Engarzar', href: '#' },
    { name: 'Batahola', href: '#' },
  ],
  customerService: [
    { name: 'Increíblemente', href: '#' },
    { name: 'Batea', href: '#' },
    { name: 'Batallón', href: '#' },
    { name: 'Gemíparo', href: '#' },
    { name: 'Gemoso', href: '#' },
    { name: 'Fichero', href: '#' },
    { name: 'Abada', href: '#' },
  ],
}

const {
  isLoading,
  isError,
  data: dogsData,
  error,
  isFetching,
  isPreviousData,
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
                  <div class="hidden lg:flex lg:items-center">
                    <a href="/" class="text-gray-9">
                      <span class="sr-only">Second Chance</span>
                      <DogIcon />
                    </a>
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
                            class="i-heroicons:heart flex-shrink-0 h-6 w-6 text-gray-400 group-hover:text-gray-500"
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
        <div class="bg-white mt-8 sm:mt-16">
          <div class="max-w-7xl mx-auto py-16 px-4 sm:px-6 lg:px-8">
            <h1 class="text-3xl font-extrabold tracking-tight text-gray-900">
              Title
            </h1>
            <p class="mt-4 max-w-xl text-sm text-gray-700">Description</p>
          </div>
        </div>

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

      <footer
        aria-labelledby="footer-heading"
        class="bg-white border-t border-gray-200"
      >
        <h2 id="footer-heading" class="sr-only">Footer</h2>
        <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div class="py-20">
            <div
              class="grid grid-cols-1 md:grid-cols-12 md:grid-flow-col md:gap-x-8 md:gap-y-16 md:auto-rows-min"
            >
              <!-- Image section -->
              <div
                class="col-span-1 md:col-span-2 lg:row-start-1 lg:col-start-1"
              >
                <DogIcon />
              </div>

              <!-- Sitemap sections -->
              <div
                class="mt-10 col-span-6 grid grid-cols-2 gap-8 sm:grid-cols-3 md:mt-0 md:row-start-1 md:col-start-3 md:col-span-8 lg:col-start-2 lg:col-span-6"
              >
                <div
                  class="grid grid-cols-1 gap-y-12 sm:col-span-2 sm:grid-cols-2 sm:gap-x-8"
                >
                  <div>
                    <h3 class="text-sm font-medium text-gray-900">Products</h3>
                    <ul role="list" class="mt-6 space-y-6">
                      <li
                        v-for="item in footerNavigation.products"
                        :key="item.name"
                        class="text-sm"
                      >
                        <a
                          :href="item.href"
                          class="text-gray-500 hover:text-gray-600"
                        >
                          {{ item.name }}
                        </a>
                      </li>
                    </ul>
                  </div>
                  <div>
                    <h3 class="text-sm font-medium text-gray-900">Company</h3>
                    <ul role="list" class="mt-6 space-y-6">
                      <li
                        v-for="item in footerNavigation.company"
                        :key="item.name"
                        class="text-sm"
                      >
                        <a
                          :href="item.href"
                          class="text-gray-500 hover:text-gray-600"
                        >
                          {{ item.name }}
                        </a>
                      </li>
                    </ul>
                  </div>
                </div>
                <div>
                  <h3 class="text-sm font-medium text-gray-900">
                    Customer Service
                  </h3>
                  <ul role="list" class="mt-6 space-y-6">
                    <li
                      v-for="item in footerNavigation.customerService"
                      :key="item.name"
                      class="text-sm"
                    >
                      <a
                        :href="item.href"
                        class="text-gray-500 hover:text-gray-600"
                      >
                        {{ item.name }}
                      </a>
                    </li>
                  </ul>
                </div>
              </div>

              <!-- Newsletter section -->
              <div
                class="mt-12 md:mt-0 md:row-start-2 md:col-start-3 md:col-span-8 lg:row-start-1 lg:col-start-9 lg:col-span-4"
              >
                <h3 class="text-sm font-medium text-gray-900">
                  Sign up for our newsletter
                </h3>
                <p class="mt-6 text-sm text-gray-500">
                  The latest deals and savings, sent to your inbox weekly.
                </p>
                <form class="mt-2 flex sm:max-w-md">
                  <label for="email-address" class="sr-only"
                    >Email address</label
                  >
                  <input
                    id="email-address"
                    type="text"
                    autocomplete="email"
                    class="appearance-none min-w-0 w-full bg-white border border-gray-300 rounded-md shadow-sm py-2 px-4 text-base text-gray-900 placeholder-gray-500 focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500"
                    required
                  />
                  <div class="ml-4 flex-shrink-0">
                    <button
                      type="submit"
                      class="w-full bg-indigo-600 border border-transparent rounded-md shadow-sm py-2 px-4 flex items-center justify-center text-base font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                    >
                      Sign up
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>

          <div class="border-t border-gray-100 py-10 text-center">
            <p class="text-sm text-gray-500">
              &copy; 2023 SecondChance, Inc. All rights reserved.
            </p>
          </div>
        </div>
      </footer>
    </div>
  </div>
</template>
