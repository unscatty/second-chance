import { type UserModule } from '~/types'

export const install: UserModule = ({ isClient, router }) => {
  if (isClient) {
    router.beforeEach((to, from, next) => {
      const { setAlertInfo } = useAlertInfoStore()
      const authStore = useAuthStore()

      const isPublicRoute = to.meta?.isPublic
      const redirectTo = to.meta?.redirectTo

      if (isPublicRoute) {
        next()
      } else if (authStore.isAuthenticated()) {
        next()
      } else {
        setAlertInfo({
          type: 'warning',
          message: 'You must be logged in to view this page',
        })
        next({ path: redirectTo || '/auth' })
      }
    })
  }
}
