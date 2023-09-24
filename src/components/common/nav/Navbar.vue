<script setup lang="ts">
// ==== Favorites ====
const { totalFavorites: favoriteDogsCount } = storeToRefs(
  useFavoriteDogsStore()
)

const isFavoritesModalOpen = ref(false)
</script>

<template>
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
                  <a
                    href="/"
                    class="text-gray-9 flex gap-2 justify-start items-center"
                  >
                    <span class="sr-only">Second Chance</span>
                    <DogIcon />
                    <span class="text-xl font-black text-gray-9 uppercase">
                      Second Chance
                    </span>
                  </a>
                </div>

                <!-- Logo (lg-) -->
                <a href="/" class="lg:hidden text-gray-5">
                  <span class="sr-only">Second Chance</span>
                  <DogIcon />
                </a>

                <div class="flex-1 flex items-center justify-end">
                  <div class="flex items-center lg:ml-8">
                    <div class="flex space-x-8">
                      <div class="flex">
                        <NavUserMenu />
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
                          {{ favoriteDogsCount > 0 ? favoriteDogsCount : '' }}
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

    <FavoritesModal v-model:is-open="isFavoritesModalOpen" />
  </div>
</template>
