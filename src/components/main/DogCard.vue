<script setup lang="ts">
import { type Dog } from '~/types'

const { dog } = defineProps<{ dog: Dog }>()
</script>

<template>
  <div
    class="w-full aspect-ratio-square bg-gray-200 rounded-lg overflow-hidden xl:aspect-ratio-[7/8]"
  >
    <img
      :src="dog.img"
      :alt="dog.name"
      class="w-full h-full object-center object-cover group-hover:opacity-75 hover:transform hover:scale-125 transition ease-in-out duration-150"
    >
  </div>
  <h3 class="mt-4 text-sm text-gray-700">
    {{ dog.name }}
  </h3>
  <p class="mt-1 text-lg font-medium text-gray-900">
    {{ dog.breed }}
  </p>
</template>
