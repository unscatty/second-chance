import { acceptHMRUpdate, defineStore } from 'pinia'
import { type Dog } from '~/types'

export const useFavoriteDogsStore = defineStore('favoriteDogs', () => {
  const favoriteDogs = ref<Dog[]>([])

  const totalFavorites = computed(() => {
    return favoriteDogs.value.length
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
  }
})

if (import.meta.hot)
  import.meta.hot.accept(
    acceptHMRUpdate(useFavoriteDogsStore as any, import.meta.hot)
  )
