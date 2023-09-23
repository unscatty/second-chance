<script setup lang="ts">
const { breeds } = defineProps<{
  breeds: string[]
}>()

const selectedDogBreeds = defineModel<string[]>('selectedDogBreeds', { required: true })

// const { filters } = storeToRefs(useFiltersStore())

const query = ref('')
const filteredBreeds = computed(() =>
  query.value === ''
    ? breeds
    : breeds.filter((breed) => {
        return breed.toLowerCase().includes(query.value.toLowerCase())
      })
)
</script>

<template>
  <Combobox v-model="selectedDogBreeds" as="div" multiple>
    <div class="relative">
      <ComboboxInput
        class="w-full text-gray-900 rounded-md border border-gray-300 bg-white py-2 pl-3 pr-10 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500 sm:text-sm"
        @change="query = $event.target.value"
      />
      <ComboboxButton
        class="absolute inset-y-0 right-0 flex items-center rounded-r-md px-2 focus:outline-none"
      >
        <div
          class="i-heroicons:chevron-up-down-20-solid h-5 w-5 text-gray-400"
          aria-hidden="true"
        />
      </ComboboxButton>

      <ComboboxOptions
        v-if="filteredBreeds.length > 0"
        class="absolute z-10 mt-1 max-h-60 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm"
      >
        <ComboboxOption
          v-for="breed in filteredBreeds"
          v-slot="{ active, selected }"
          :key="breed"
          :value="breed"
          as="template"
        >
          <li
            class="relative cursor-default select-none py-2 pl-3 pr-9"
            :class="[active ? 'bg-indigo-600 text-white' : 'text-gray-900']"
          >
            <span class="block truncate" :class="[selected && 'font-semibold']">
              {{ breed }}
            </span>

            <span
              v-if="selected"
              class="absolute inset-y-0 right-0 flex items-center pr-4"
              :class="[active ? 'text-white' : 'text-indigo-600']"
            >
              <div
                class="i-heroicons:check-20-solid h-5 w-5"
                aria-hidden="true"
              />
            </span>
          </li>
        </ComboboxOption>
      </ComboboxOptions>
    </div>
  </Combobox>
</template>
