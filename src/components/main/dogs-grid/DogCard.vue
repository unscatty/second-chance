<script setup lang="ts">
import { type Dog } from '~/types'
import { ageDescription } from '~/utils/dogInfo'

const { dog } = defineProps<{
  dog: Dog
}>()

const { age, breed, img: image, name, location } = toRefs(dog)

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
    class="relative w-full aspect-ratio-square bg-gray-200 rounded-2xl overflow-hidden xl:aspect-ratio-[7/8]"
  >
    <img
      :src="image"
      :alt="name"
      class="w-full h-full object-center object-cover group-hover:transform group-hover:scale-125 transition ease-in-out duration-150"
    />

    <!-- Overlay -->
    <div
      class="absolute w-full h-full bottom-0 bg-gray-900 opacity-0"
      :class="isFavoriteDog ? 'opacity-65' : ''"
      sm="group-hover:opacity-65"
    />
    <button
      type="button"
      class="absolute flex h-full w-full bottom-0 items-center justify-center text-white"
      @click="addToFavorites"
    >
      <span
        :class="[
          isFavoriteDog
            ? 'i-heroicons:heart-20-solid'
            : 'i-heroicons:heart hidden sm:group-hover:block',
        ]"
        class="h-1/3 w-1/3 flex-shrink-0"
        aria-hidden="true"
      />
      <span class="sr-only">Add to favorites</span>
    </button>
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
  <div
    class="mt-2 flex items-center justify-between text-base font-medium text-gray-500 space-x-8"
  >
    <p class="text-sm font-italic font-light">
      {{ breed }}
    </p>
    <p v-if="location">
      <span
        class="inline-flex items-center gap-1 px-2 py-0.75 rounded-full text-xs font-bold bg-gray-200 text-gray-800"
      >
        <div class="i-heroicons:map-pin-20-solid h-4 w-4" />
        {{ location.city }}
      </span>
    </p>
  </div>
</template>
