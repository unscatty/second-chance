<script setup lang="ts">
import { type Dog } from '~/types'
import { ageDescription } from '~/utils/dogInfo'

const { dog } = defineProps<{
  dog: Dog
}>()

const { age, breed, img: image, name } = toRefs(dog)

// ===== Favorites =====
const favoriteDogsStore = useFavoriteDogsStore()
const isFavoriteDog = computed(() => favoriteDogsStore.isFavoriteDog(dog))

const addToFavorites = () => {
  if (isFavoriteDog.value) {
    favoriteDogsStore.removeFavoriteDog(dog.id)
  } else {
    favoriteDogsStore.addFavoriteDog(dog)
  }
}
</script>

<template>
  <div
    class="relative w-full aspect-ratio-square bg-gray-200 rounded-lg overflow-hidden xl:aspect-ratio-[7/8]"
  >
    <img
      :src="image"
      :alt="name"
      class="w-full h-full object-center object-cover group-hover:transform group-hover:scale-125 transition ease-in-out duration-150"
    />

    <!-- Overlay -->
    <div
      class="absolute w-full h-full bottom-0 bg-gray-900 opacity-0 group-hover:opacity-65"
    />
    <div
      class="absolute flex items-end justify-center p-4 absolute bottom-0 w-full opacity-0 group-hover:opacity-100"
    >
      <button
        class="flex justify-center w-1/2 bg-white bg-opacity-75 backdrop-filter backdrop-blur py-2 px-4 rounded-md text-sm font-medium text-gray-900 text-center"
        @click="addToFavorites"
      >
        <div
          v-if="isFavoriteDog"
          class="i-heroicons:heart-20-solid h-6 w-6 flex-shrink-0"
          aria-hidden="true"
        />
        <div
          v-else
          class="i-heroicons:heart h-6 w-6 flex-shrink-0"
          aria-hidden="true"
        />
        <span class="sr-only">Add to favorites</span>
      </button>
    </div>
  </div>
  <div
    class="mt-4 flex items-center justify-between text-base font-medium text-gray-900 space-x-8"
  >
    <h3>
      {{ name }}
    </h3>
    <p>
      <span
        class="inline-flex items-center px-3 py-0.75 rounded text-xs font-bold bg-blue-100 text-blue-800"
      >
        {{ ageDescription(age) }}
      </span>
    </p>
  </div>
  <p class="mt-1 text-sm text-gray-500 text-left">
    {{ breed }}
  </p>
</template>
