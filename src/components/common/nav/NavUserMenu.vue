<script setup lang="ts">
const { logout } = useAuthStore()
const { setAlertInfo } = useAlertInfoStore()
const router = useRouter()

const logoutUser = async () => {
  await logout()

  setAlertInfo({
    message: 'You have been logged out.',
    type: 'info',
  })

  router.push('/auth')
}
</script>

<template>
  <!-- Profile dropdown -->
  <Menu as="div" class="ml-3 relative">
    <div>
      <MenuButton
        class="flex text-sm rounded-full text-gray-400"
        focus="text-gray-500"
        hover="text-gray-500"
      >
        <span class="sr-only">Open user menu</span>
        <div class="i-heroicons:user-20-solid w-6 h-6" aria-hidden="true" />
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
        class="origin-top-right absolute right-0 mt-2 w-48 rounded-md shadow-lg py-1 bg-white ring-1 ring-black ring-opacity-5 focus:outline-none"
      >
        <MenuItem v-slot="{ active }">
          <button
            type="button"
            :class="[
              active ? 'bg-gray-100' : '',
              'block px-4 py-2 text-sm text-gray-700 w-full text-left',
            ]"
            @click="logoutUser"
          >
            Sign out
          </button>
        </MenuItem>
      </MenuItems>
    </transition>
  </Menu>
</template>
