<script setup lang="ts">
import { type Dog } from '~/types'
import { ageDescription } from '~/utils/dogInfo'

const { dog } = defineProps<{
  dog: Dog
}>()

const { age, breed, img: image, name, location } = toRefs(dog)
</script>

<template>
  <div
    class="w-full grid grid-cols-1 gap-y-8 gap-x-6 items-start sm:grid-cols-12 lg:gap-x-8 mt-8"
    sm="flex items-center"
  >
    <div class="sm:col-span-6 lg:col-span-7 flex-1">
      <div
        class="aspect-ratio-square rounded-xl bg-gray-100 overflow-hidden lg:rounded-3xl"
      >
        <img
          :src="image"
          :alt="name"
          class="object-center object-cover min-w-full min-h-full lg:min-h-md lg:min-w-md"
        />
      </div>
    </div>
    <div class="sm:col-span-6 lg:col-span-5 flex-1 flex-grow">
      <div class="bg-white shadow overflow-hidden sm:rounded-lg">
        <div class="px-4 py-5 sm:px-6">
          <h3 class="text-lg leading-6 font-medium text-gray-900">
            Here are the details for your ideal pup!
          </h3>
        </div>
        <div class="border-t border-gray-200">
          <dl>
            <div
              class="bg-gray-50 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6"
            >
              <dt class="text-sm font-medium text-gray-500">Name</dt>
              <dd class="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                {{ name }}
              </dd>
            </div>
            <div
              class="bg-white px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6"
            >
              <dt class="text-sm font-medium text-gray-500">Breed</dt>
              <dd class="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                {{ breed }}
              </dd>
            </div>
            <div
              class="bg-gray-50 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6"
            >
              <dt class="text-sm font-medium text-gray-500">Age</dt>
              <dd class="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                {{ ageDescription(age) }}
              </dd>
            </div>
            <div
              class="bg-white px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6"
            >
              <dt class="text-sm font-medium text-gray-500">Lives in</dt>
              <dd class="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                <p>{{ location.state }},</p>
                <p>{{ location.city }},</p>
                <p>{{ location.county }}</p>
                <p>Zip Code: {{ location.zip_code }}</p>
              </dd>
            </div>
          </dl>
        </div>
      </div>
    </div>
  </div>
</template>
