<script setup lang="ts">
const authStore = useAuthStore()
const router = useRouter()

onBeforeMount(() => {
  if (authStore.isAuthenticated()) {
    router.push('/')
  }
})
</script>

<template>
  <Login />
</template>

<route lang="yaml">
meta:
  layout: auth
  isPublic: true
</route>
