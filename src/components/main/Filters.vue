<script setup lang="ts">
import { useQuery } from '@tanstack/vue-query'
import { UnwrapRef } from 'vue'
import dogService from '~/services/dog.service'
import { type DogSearchSortBy, type DogSearchFilterQueryParams } from '~/types'
import RangeSlider from '@vueform/slider'

const defaultFilters: DogSearchFilterQueryParams = {
  breeds: [],
  zipCodes: [],
  ageMin: 0,
  ageMax: 30,
}

const { filters, sortBy } = storeToRefs(useFiltersStore())
const { reset: resetPagination } = usePaginationStore()

const selectedFilters = ref<UnwrapRef<typeof filters>>(
  structuredClone(toRaw(filters.value))
)

const { data: availableDogBreeds } = useQuery({
  queryKey: ['dogBreeds'],
  queryFn: async () => dogService.getBreeds(),
  initialData: [],
})

const ageRange = ref([
  selectedFilters.value.ageMin,
  selectedFilters.value.ageMax,
])

const sortOptions: Record<DogSearchSortBy['field'], string> = {
  breed: 'Breed',
  name: 'Name',
  age: 'Age',
}

const sortDirections: Record<'asc' | 'desc', string> = {
  asc: 'Ascending',
  desc: 'Descending',
}

const removeBreed = (breedIndex: number) => {
  selectedFilters.value.breeds.splice(breedIndex, 1)
}

const clearFilters = () => {
  selectedFilters.value = structuredClone(defaultFilters)

  applyFilters()
}

const applyFilters = () => {
  resetPagination()

  filters.value = structuredClone(toRaw(selectedFilters.value))
  // filters.value = selectedFilters.value
}
</script>

<template>
  <!-- Filters -->
  <Popover
    as="section"
    aria-labelledby="filter-heading"
    class="relative z-10 border-t border-b border-gray-200 grid items-center"
  >
    <h2 id="filter-heading" class="sr-only">Filters</h2>
    <div class="relative col-start-1 row-start-1 py-4">
      <div
        class="max-w-7xl mx-auto flex space-x-6 divide-x divide-gray-200 text-sm px-4 sm:px-6 lg:px-8"
      >
        <div>
          <PopoverButton
            class="group text-gray-700 font-medium flex items-center"
          >
            <div
              class="i-heroicons:funnel-20-solid flex-none w-5 h-5 mr-2 text-gray-400 group-hover:text-gray-500"
              aria-hidden="true"
            />
            Filters
          </PopoverButton>
        </div>
        <div class="pl-6">
          <button type="button" class="text-gray-500" @click="clearFilters">
            Clear all
          </button>
        </div>
      </div>
    </div>
    <PopoverPanel
      class="absolute top-100% w-full border-t border-gray-200 py-0 bg-white"
    >
      <div
        class="max-w-7xl mx-auto my-5 grid grid-cols-1 gap-x-4 px-4 text-sm sm:px-6 md:gap-x-6 lg:px-8"
      >
        <div
          class="grid grid-cols-1 gap-y-3 auto-rows-min md:grid-cols-2 md:gap-x-6"
        >
          <fieldset>
            <legend class="block font-medium text-black">Breed</legend>
            <div class="flex flex-wrap items-center gap-3">
              <DogBreedsCombo
                v-model:selected-dog-breeds="selectedFilters.breeds"
                class="min-w-100% sm:min-w-50%"
                :breeds="availableDogBreeds"
              />
              <DogBreedChip
                v-for="(breed, breedIdx) in selectedFilters.breeds"
                :key="breed"
                :breed="breed"
                :breed-index="breedIdx"
                @remove-breed="removeBreed"
              />
            </div>
            <!-- Here add chips -->
          </fieldset>
          <fieldset>
            <legend class="block font-medium text-black">
              Age {{ selectedFilters.ageMin }} - {{ selectedFilters.ageMax }}
            </legend>
            <div class="px-4 sm:px-0">
              <RangeSlider
                v-model="ageRange"
                :step="1"
                :merge="5"
                :min="0"
                :max="30"
                show-tooltip="drag"
                class="my-4 [--slider-height:0.75rem] [--slider-connect-bg:theme('colors.indigo.600')] [--slider-tooltip-bg:theme('colors.indigo.600')]"
                @change="
                  (updateRange: number[]) => {
                    selectedFilters.ageMin = updateRange[0]
                    selectedFilters.ageMax = updateRange[1]
                  }
                "
              />
            </div>
          </fieldset>
        </div>
        <div class="w-full mt-5 sm:flex-shrink-0 sm:flex sm:items-center">
          <PopoverButton
            as="button"
            href="#"
            type="button"
            class="w-full inline-flex items-center justify-center px-4 py-2 border border-transparent shadow-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:text-sm sm:w-30"
            @click="applyFilters"
          >
            Apply
          </PopoverButton>
        </div>
      </div>
    </PopoverPanel>
    <div class="col-start-1 row-start-1 py-4">
      <div
        class="flex gap-x-4 justify-end items-center max-w-7xl mx-auto px-4 sm:px-6 lg:px-8"
      >
        <div class="flex flex-col gap-y-1" sm="flex-row items-center gap-x-4">
          <p class="text-black text-xs sm:text-sm">Sort by</p>
          <div class="flex gap-x-4">
            <Menu as="div" class="relative inline-block">
              <div class="flex">
                <MenuButton
                  class="group inline-flex justify-center text-sm font-medium text-gray-700 hover:text-gray-900"
                >
                  {{ sortOptions[sortBy.field] }}
                  <div
                    class="i-heroicons:chevron-down-20-solid flex-shrink-0 -mr-1 ml-1 h-5 w-5 text-gray-400 group-hover:text-gray-500"
                    aria-hidden="true"
                  />
                </MenuButton>
              </div>

              <transition
                enter-active-class="transition ease-out duration-100"
                enter-from-class="transform opacity-0 scale-95"
                enter-to-class="transform opacity-100 scale-100"
                leave-active-class="transition ease-in duration-75"
                leave-from-class="transform opacity-100 scale-100"
                leave-to-class="transform opacity-0 scale-95"
              >
                <MenuItems
                  class="origin-top-right absolute right-0 mt-2 w-40 rounded-md shadow-2xl bg-white ring-1 ring-black ring-opacity-5 focus:outline-none"
                >
                  <div class="py-1">
                    <MenuItem
                      v-for="(fieldName, key) in sortOptions"
                      :key="key"
                      v-slot="{ active }"
                      @click="sortBy.field = key"
                    >
                      <a
                        href="#"
                        class="block px-4 py-2 text-sm"
                        :class="[
                          key === sortBy.field
                            ? 'font-medium text-gray-900'
                            : 'text-gray-500',
                          active ? 'bg-gray-100' : '',
                        ]"
                      >
                        {{ fieldName }}
                      </a>
                    </MenuItem>
                  </div>
                </MenuItems>
              </transition>
            </Menu>
            <Menu as="div" class="relative inline-block">
              <div class="flex">
                <MenuButton
                  class="group inline-flex justify-center text-sm font-medium text-gray-700 hover:text-gray-900"
                >
                  {{ sortDirections[sortBy.direction] }}
                  <div
                    class="i-heroicons:chevron-down-20-solid flex-shrink-0 -mr-1 ml-1 h-5 w-5 text-gray-400 group-hover:text-gray-500"
                    aria-hidden="true"
                  />
                </MenuButton>
              </div>

              <transition
                enter-active-class="transition ease-out duration-100"
                enter-from-class="transform opacity-0 scale-95"
                enter-to-class="transform opacity-100 scale-100"
                leave-active-class="transition ease-in duration-75"
                leave-from-class="transform opacity-100 scale-100"
                leave-to-class="transform opacity-0 scale-95"
              >
                <MenuItems
                  class="origin-top-right absolute right-0 mt-2 w-40 rounded-md shadow-2xl bg-white ring-1 ring-black ring-opacity-5 focus:outline-none"
                >
                  <div class="py-1">
                    <MenuItem
                      v-for="(directionName, key) in sortDirections"
                      :key="key"
                      v-slot="{ active }"
                      @click="sortBy.direction = key"
                    >
                      <a
                        href="#"
                        class="block px-4 py-2 text-sm"
                        :class="[
                          key === sortBy.direction
                            ? 'font-medium text-gray-900'
                            : 'text-gray-500',
                          active ? 'bg-gray-100' : '',
                        ]"
                      >
                        {{ directionName }}
                      </a>
                    </MenuItem>
                  </div>
                </MenuItems>
              </transition>
            </Menu>
          </div>
        </div>
      </div>
    </div>
  </Popover>
</template>

<style src="@vueform/slider/themes/default.css"></style>
<style scoped>
.age-slider {
  margin: 1rem auto;
  --slider-height: 0.75rem;
}
</style>
