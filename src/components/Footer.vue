<script setup lang="ts">
const footerNavigation = {
  quickLinks: [
    { name: 'About Us', href: '#' },
    { name: 'Adopt a Dog', href: '#' },
    { name: 'Success stories', href: '#' },
    { name: 'Blog', href: '#' },
    { name: 'FAQ', href: '#' },
    { name: 'Terms of Service', href: '#' },
    { name: 'Privacy Policy', href: '#' },
  ],
  company: [
    { name: 'Dog Care Tips', href: '#' },
    { name: 'Training guides', href: '#' },
    { name: 'Health and nutrition', href: '#' },
    { name: 'Adoption Process', href: '#' },
    { name: 'Shelter Partners', href: '#' },
    { name: 'Volunteer opportunities', href: '#' },
    { name: 'Donate to Second Chance', href: '#' },
  ],
  location: [
    { name: 'Second Chance Headquarters', href: '#' },
    { name: "123 Pet Lover's Lane", href: '#' },
    { name: 'Cityville, State 12345', href: '#' },
    { name: 'United States', href: '#' },
  ],
}

const socialIcons = [
  { iconClass: 'i-cib:facebook', name: 'Facebook' },
  { iconClass: 'i-cib:twitter', name: 'Twitter' },
  { iconClass: 'i-cib:instagram', name: 'Instagram' },
  { iconClass: 'i-cib:youtube', name: 'Youtube' },
  { iconClass: 'i-heroicons:globe-alt', name: 'Website' },
]
</script>

<template>
  <footer
    aria-labelledby="footer-heading"
    class="bg-white border-t border-gray-200"
  >
    <h2 id="footer-heading" class="sr-only">Footer</h2>
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div class="py-20">
        <div
          class="grid grid-cols-1 md:grid-cols-12 md:grid-flow-col md:gap-x-8 md:gap-y-16 md:auto-rows-min"
        >
          <!-- Image section -->
          <div class="col-span-1 md:col-span-2 lg:row-start-1 lg:col-start-1">
            <DogIcon class="h-10 w-10" />
          </div>

          <!-- Sitemap sections -->
          <div
            class="mt-10 col-span-6 grid grid-cols-2 gap-8 sm:grid-cols-3 md:mt-0 md:row-start-1 md:col-start-3 md:col-span-8 lg:col-start-2 lg:col-span-6"
          >
            <div
              class="grid grid-cols-1 gap-y-12 sm:col-span-2 sm:grid-cols-2 sm:gap-x-8"
            >
              <div>
                <h3 class="text-sm font-medium text-gray-900">Quick Links</h3>
                <ul role="list" class="mt-6 space-y-4">
                  <li
                    v-for="item in footerNavigation.quickLinks"
                    :key="item.name"
                    class="text-sm"
                  >
                    <a
                      :href="item.href"
                      class="text-gray-500 hover:text-gray-600"
                    >
                      {{ item.name }}
                    </a>
                  </li>
                </ul>
              </div>
              <div>
                <h3 class="text-sm font-medium text-gray-900">Company</h3>
                <ul role="list" class="mt-6 space-y-4">
                  <li
                    v-for="item in footerNavigation.company"
                    :key="item.name"
                    class="text-sm"
                  >
                    <a
                      :href="item.href"
                      class="text-gray-500 hover:text-gray-600"
                    >
                      {{ item.name }}
                    </a>
                  </li>
                </ul>
              </div>
            </div>
            <div>
              <h3 class="text-sm font-medium text-gray-900">Location</h3>
              <ul role="list" class="mt-4 space-y-1">
                <li
                  v-for="item in footerNavigation.location"
                  :key="item.name"
                  class="text-sm"
                >
                  <a
                    :href="item.href"
                    class="text-gray-500 hover:text-gray-600"
                  >
                    {{ item.name }}
                  </a>
                </li>
              </ul>
            </div>
          </div>

          <!-- Newsletter section -->
          <div
            class="mt-12 md:mt-0 md:row-start-2 md:col-start-3 md:col-span-8 lg:row-start-1 lg:col-start-9 lg:col-span-4"
          >
            <h3 class="text-sm font-medium text-gray-900">Stay Connected</h3>
            <p class="mt-6 text-sm text-gray-500">
              Subscribe to our newsletter for the latest updates and
              heartwarming stories of rescue and adoption!
            </p>
            <form class="mt-2 flex sm:max-w-md">
              <label for="email-address" class="sr-only">Email address</label>
              <input
                id="email-address"
                type="text"
                autocomplete="email"
                class="appearance-none min-w-0 w-full bg-white border border-gray-300 rounded-md shadow-sm py-2 px-4 text-base text-gray-900 placeholder-gray-500 focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500"
                required
              />
              <div class="ml-4 flex-shrink-0">
                <button
                  type="submit"
                  class="w-full bg-indigo-600 border border-transparent rounded-md shadow-sm py-2 px-4 flex items-center justify-center text-base font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                >
                  Sign up
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>

      <div
        class="mb-8 border-t border-gray-200 pt-8 md:flex md:items-center md:justify-between"
      >
        <div class="flex space-x-6 md:order-2">
          <a
            v-for="item in socialIcons"
            :key="item.name"
            href="item#.href"
            class="text-gray-400 hover:text-gray-500"
          >
            <span class="sr-only">{{ item.name }}</span>
            <div :class="item.iconClass" class="h-6 w-6" aria-hidden="true" />
          </a>
        </div>
        <p class="mt-8 text-base text-gray-400 md:mt-0 md:order-1">
          &copy; 2023 Second Chance. All rights reserved.
        </p>
      </div>

      <!-- <div class="border-t border-gray-100 py-10 text-center">
        <p class="text-sm text-gray-500">
          &copy; 2023 SecondChance, Inc. All rights reserved.
        </p>
      </div> -->
    </div>
  </footer>
</template>
