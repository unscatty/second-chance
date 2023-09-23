import { acceptHMRUpdate, defineStore } from 'pinia'
import { type Dog } from '~/types'

export const useFavoritDogsStore = defineStore('favoriteDogs', () => {
  const favoriteDogs = ref<Dog[]>([])

  // Fake fogs data
  const { data: dogsData } = useDogSearch('dogs')
  const fakeFavoriteDogs = computed(() => dogsData.value?.dogs.slice(0, 20))

  const totalFavorites = computed(() => {
    // return favoriteDogs.value.length
    // FIXME: fake data
    return fakeFavoriteDogs.value?.length || 0
  })

  const addFavoriteDog = (dog: Dog) => {
    favoriteDogs.value.push(dog)
  }

  const removeFavoriteDog = (dogId: Dog['id']) => {
    const dogIndex = favoriteDogs.value.findIndex((dog) => dog.id === dogId)

    if (dogIndex === -1) {
      return
    }

    favoriteDogs.value.splice(dogIndex, 1)
  }

  const isFavoriteDog = (dog: Dog) => {
    return favoriteDogs.value.some((favoriteDog) => favoriteDog.id === dog.id)
  }

  return {
    favoriteDogs,
    addFavoriteDog,
    removeFavoriteDog,
    isFavoriteDog,
    totalFavorites,
    fakeFavoriteDogs,
  }
})

if (import.meta.hot)
  import.meta.hot.accept(
    acceptHMRUpdate(useFavoritDogsStore as any, import.meta.hot)
  )
