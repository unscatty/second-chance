<script setup lang="ts">
import { type Dog } from '~/types'
import { ageDescription } from '~/utils/dogInfo'

const { dog } = defineProps<{
  dog: Dog
}>()

const { age, breed, img: image, name, location } = toRefs(dog)

const emit = defineEmits<{
  (e: 'removeDog', dogId: Dog['id']): void
}>()

// ===== Favorites =====
const removeDog = () => {
  emit('removeDog', dog.id)
}
</script>

<template>
  <div
    class="col-span-1 flex flex-col text-center bg-white rounded-lg shadow divide-y divide-gray-200"
  >
    <div class="flex-1 flex flex-col p-6 sm:p-4">
      <img
        class="w-32 h-32 flex-shrink-0 mx-auto rounded-full object-center object-cover"
        :src="image"
        alt=""
      />
      <h3 class="mt-6 text-gray-900 text-xl font-medium">
        {{ name }}
      </h3>
      <dl class="mt-1 flex-grow flex flex-col justify-between">
        <dt class="sr-only">Breed</dt>
        <dd class="text-gray-500 text-sm">{{ breed }}</dd>
        <dt class="sr-only">Age</dt>
        <dd
          class="flex flex-col items-center md:flex-row gap-1 md:justify-center md:flex-wrap mt-3"
        >
          <span
            class="px-4 py-1 text-xs font-medium rounded-full bg-blue-100 text-blue-800"
            >{{ ageDescription(age) }}</span
          >
          <span
            v-if="location"
            class="inline-flex items-center justify-center gap-1 px-2 py-0.75 rounded-full text-xs font-bold bg-gray-200 text-gray-800"
          >
            <div class="i-heroicons:map-pin-20-solid h-4 w-4"></div>
            {{ location.state }}, {{ location.city }}, {{ location.county }}
          </span>
        </dd>
      </dl>
    </div>
    <div>
      <div class="-mt-px flex divide-x divide-gray-200">
        <div class="w-0 flex-1 flex">
          <button
            type="button"
            class="relative -mr-px w-0 flex-1 inline-flex items-center justify-center py-4 text-sm font-medium border border-transparent rounded-bl-lg text-red-400 font-black hover:text-red-700"
            @click="removeDog"
          >
            <div
              class="i-heroicons:trash-20-solid w-5 h-5"
              aria-hidden="true"
            />
            <span class="ml-3">Delete</span>
          </button>
        </div>
      </div>
    </div>
  </div>
</template>
