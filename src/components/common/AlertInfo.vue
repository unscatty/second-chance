<script setup lang="ts">
const alertStore = useAlertInfoStore()
const { alertInfo } = storeToRefs(alertStore)
const { clearAlertInfo } = alertStore
</script>

<template>
  <div
    v-show="alertInfo.status"
    :class="`${alertInfo.type}`"
    class="alert-container rounded-md p-4"
    @click="clearAlertInfo"
  >
    <div class="flex flex-col items-center">
      <template v-for="(text, index) in alertInfo.message" :key="index">
        <span>
          {{ text || 'Something went wrong' }}
        </span>
      </template>
    </div>
  </div>
</template>
