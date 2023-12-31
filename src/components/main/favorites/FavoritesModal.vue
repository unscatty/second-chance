<script setup lang="ts">
import { type Dog as DogType } from '~/types'
import dogService from '~/services/dog.service'

const favoriteDogsStore = useFavoriteDogsStore()
const { favoriteDogs } = storeToRefs(favoriteDogsStore)
const { removeFavoriteDog } = favoriteDogsStore

const isOpen = defineModel<boolean>('isOpen', { required: true })

const removeDog = (dogId: DogType['id']) => {
  removeFavoriteDog(dogId)
}

const isMatchDisabled = computed(() => favoriteDogs.value.length === 0)

const onModalClose = () => {
  if (isMatchModalOpen.value) {
    return
  }

  isOpen.value = false
}

// ===== Match =====
const isMatchModalOpen = ref(false)
const isWaitingForMatch = ref(false)
const matchedDog = ref<DogType | undefined>(undefined)

const openMatchModal = () => {
  isMatchModalOpen.value = true
}

const getMatch = async () => {
  isWaitingForMatch.value = true

  matchedDog.value = await dogService.match(
    favoriteDogs.value.map((dog) => dog.id)
  )

  isWaitingForMatch.value = false

  openMatchModal()
}
</script>

<template>
  <TransitionRoot as="template" :show="isOpen">
    <Dialog as="div" class="fixed z-10 inset-0" @close="onModalClose">
      <div
        class="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0"
      >
        <TransitionChild
          as="template"
          enter="ease-out duration-300"
          enter-from="opacity-0"
          enter-to="opacity-100"
          leave="ease-in duration-200"
          leave-from="opacity-100"
          leave-to="opacity-0"
        >
          <DialogOverlay
            class="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity"
          />
        </TransitionChild>

        <!-- This element is to trick the browser into centering the modal contents. -->
        <span
          class="hidden sm:inline-block sm:align-middle sm:h-screen"
          aria-hidden="true"
          >&#8203;</span
        >
        <TransitionChild
          as="template"
          enter="ease-out duration-300"
          enter-from="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
          enter-to="opacity-100 translate-y-0 sm:scale-100"
          leave="ease-in duration-200"
          leave-from="opacity-100 translate-y-0 sm:scale-100"
          leave-to="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
        >
          <div
            class="relative w-full inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-2/3"
          >
            <div class="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
              <div class="flex flex-col">
                <div class="sm:flex sm:items-start">
                  <div
                    class="mx-auto flex-shrink-0 flex items-center justify-center h-12 w-12 rounded-full bg-indigo-100 sm:mx-0 sm:h-10 sm:w-10"
                  >
                    <div class="h-6 w-6 text-indigo-600" aria-hidden="true">
                      <DogIcon />
                    </div>
                  </div>
                  <div
                    class="mt-3 mb-2 text-center sm:mt-0 sm:ml-4 sm:text-left"
                  >
                    <DialogTitle
                      as="h3"
                      class="text-2xl leading-6 font-medium text-gray-900"
                    >
                      Your favorite furry friends
                    </DialogTitle>
                    <div class="mt-2">
                      <p class="text-sm text-gray-500">
                        Check this list of your favorite dogs! Once you are
                        done, click on the
                        <span font-black> Match! </span> button to see which dog
                        is the best match for you.
                      </p>
                    </div>
                  </div>
                </div>
                <!-- Favorite dogs grid -->
                <div class="max-h-lg overflow-y-scroll overflow-x-hidden p-6">
                  <div
                    v-if="favoriteDogs.length < 1"
                    class="relative block w-full border-2 border-gray-300 border-dashed rounded-lg p-12 text-center hover:border-gray-400 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                  >
                    <span class="mt-2 block text-2xl font-medium text-gray-900">
                      You have no favorite dogs. Add some!
                    </span>
                  </div>

                  <ul role="list" class="grid grid-cols-1 gap-6 lg:grid-cols-3">
                    <li v-for="dog in favoriteDogs" :key="dog.id">
                      <FavoriteDogCard :dog="dog" @remove-dog="removeDog" />
                    </li>
                  </ul>
                </div>
              </div>
            </div>
            <div
              class="bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse"
            >
              <button
                type="button"
                class="min-w-50 w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-red-600 text-base font-medium text-white hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 sm:ml-3 sm:w-auto sm:text-sm"
                :class="{
                  'opacity-50 cursor-not-allowed': isMatchDisabled,
                }"
                :disabled="isMatchDisabled"
                @click="getMatch"
              >
                <div v-if="isWaitingForMatch" class="inline-flex gap-2">
                  <div
                    class="h-5 w-5 animate-spin rounded-full border-4 border-solid border-current border-r-transparent align-[-0.125em] motion-reduce:animate-[spin_1.5s_linear_infinite]"
                    role="status"
                  />
                  <p class="font-bold">Finding your match</p>
                </div>
                <div v-else>
                  <p class="font-bold">Match!</p>
                </div>
              </button>
              <button
                type="button"
                class="mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm"
                @click="isOpen = false"
              >
                Close
              </button>
            </div>
          </div>
        </TransitionChild>
      </div>
    </Dialog>
  </TransitionRoot>

  <!-- Match Modal -->
  <MatchModal v-model:is-open="isMatchModalOpen" :matched-dog="matchedDog" />
</template>
