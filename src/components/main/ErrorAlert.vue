<script setup lang="ts">
const { attempts } = defineProps<{ attempts: number }>()
</script>

<template>
  <div class="rounded-md bg-red-50 p-4">
    <div class="flex">
      <div class="ml-3">
        <h3 class="text-sm font-medium text-red-800">
          There was an error when trying to fetch your puppies
        </h3>
        <div class="mt-2 text-sm text-red-700">
          <ul role="list" class="list-disc pl-5 space-y-1">
            <li>Please contact the administrator</li>
            <li>Total retries: {{ attempts }}</li>
          </ul>
        </div>
      </div>
    </div>
  </div>
</template>
