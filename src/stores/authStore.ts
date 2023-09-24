import { acceptHMRUpdate, defineStore } from 'pinia'
import authService from '~/services/auth.service'

export const useAuthStore = defineStore('auth', () => {
  const expirationInMilliseconds = 60 * 60 * 1000 // 1 hour expiration time
  const sessionExpiration = useStorage(
    'sessionExpiration',
    0
  )

  const isAuthenticated = () => {
    const now = new Date().getTime()
    return now < sessionExpiration.value
  }

  const login = async (
    ...loginCredentials: Parameters<(typeof authService)['login']>
  ) => {
    await authService.login(...loginCredentials)
    // Update session expiration
    sessionExpiration.value = new Date().getTime() + expirationInMilliseconds
  }

  const logout = async () => {
    await authService.logout()
    // Update session expiration
    sessionExpiration.value = new Date().getTime()
  }

  return {
    isAuthenticated,
    login,
    logout,
  }
})

if (import.meta.hot)
  import.meta.hot.accept(acceptHMRUpdate(useAuthStore as any, import.meta.hot))
