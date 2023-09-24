<script setup lang="ts">
// https://github.com/vueuse/head
// you can use this to manipulate the document head in any components,
// they will be rendered correctly in the html results with vite-ssg
useHead({
  title: 'Second Chance',
  meta: [
    { name: 'description', content: 'Embrace Love, Adopt a Second Chance' },
    {
      name: 'theme-color',
      content: () => (isDark.value ? '#021b1b' : '#ffffff'),
    },
  ],
  link: [
    {
      rel: 'icon',
      type: 'image/svg+xml',
      href: computed(
        () =>
          import.meta.env.BASE_URL +
          (preferredDark.value ? 'favicon-dark.svg' : 'favicon.svg')
      ),
    },
  ],
})
</script>

<template>
  <RouterView />
</template>
