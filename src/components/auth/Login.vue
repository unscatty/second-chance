<script setup lang="ts">
const authStore = useAuthStore()
const { setAlertInfo, setErrorMessage } = useAlertInfoStore()

const authCredentials = ref({
  name: '',
  email: '',
})

const router = useRouter()

const login = async () => {
  if (!authCredentials.value.email || !authCredentials.value.name) {
    setAlertInfo({
      message: 'Please fill in all fields',
      type: 'warning',
    })

    return
  }

  try {
    await authStore.login(authCredentials.value)

    setAlertInfo({
      message: `Welcome ${authCredentials.value.name}`,
      type: 'success',
    })

    router.push('/')
  } catch (error: any) {
    setErrorMessage(
      `Invalid credentials for: ${authCredentials.value.name}, ${authCredentials.value.email}`
    )
  }
}
</script>

<template>
  <div
    class="min-h-full flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8"
  >
    <div class="max-w-md w-full space-y-8">
      <div>
        <DogIcon class="mx-auto h-12 w-auto text-indigo-600" />
        <h2 class="mt-6 text-center text-3xl font-extrabold text-gray-900">
          Sign in to your account
        </h2>
      </div>
      <form class="mt-8 space-y-6" action="#">
        <input type="hidden" name="remember" value="true" />
        <div class="rounded-md shadow-sm -space-y-px">
          <div>
            <label for="name" class="sr-only">Name</label>
            <input
              id="name"
              v-model="authCredentials.name"
              name="name"
              type="text"
              required
              class="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
              placeholder="Your name"
            />
          </div>
          <div>
            <label for="email-address" class="sr-only">Email address</label>
            <input
              id="email-address"
              v-model="authCredentials.email"
              name="email"
              type="email"
              autocomplete="email"
              required
              class="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-b-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
              placeholder="Email address"
            />
          </div>
        </div>

        <div class="flex items-center justify-between">
          <div class="flex items-center">
            <input
              id="remember-me"
              name="remember-me"
              type="checkbox"
              class="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
            />
            <label for="remember-me" class="ml-2 block text-sm text-gray-900">
              Remember me
            </label>
          </div>
        </div>

        <div>
          <button
            type="submit"
            class="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            @click.prevent="login"
          >
            <span class="absolute left-0 inset-y-0 flex items-center pl-3">
              <div
                class="i-heroicons-lock-closed-20-solid h-5 w-5 text-indigo-500 group-hover:text-indigo-400"
                aria-hidden="true"
              />
            </span>
            Sign in
          </button>
        </div>
      </form>
    </div>
  </div>
</template>
