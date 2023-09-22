<script setup lang="ts">
const footerNavigation = {
  products: [
    { name: 'Fidelidad', href: '#' },
    { name: 'Descerebración', href: '#' },
    { name: 'Abaldonamiento', href: '#' },
    { name: 'Increíblemente', href: '#' },
    { name: 'Bateaguas', href: '#' },
  ],
  company: [
    { name: 'Batanear', href: '#' },
    { name: 'Batanear', href: '#' },
    { name: 'Descentralizador', href: '#' },
    { name: 'Descercar', href: '#' },
    { name: 'Engarzar', href: '#' },
    { name: 'Batahola', href: '#' },
  ],
  customerService: [
    { name: 'Increíblemente', href: '#' },
    { name: 'Batea', href: '#' },
    { name: 'Batallón', href: '#' },
    { name: 'Gemíparo', href: '#' },
    { name: 'Gemoso', href: '#' },
    { name: 'Fichero', href: '#' },
    { name: 'Abada', href: '#' },
  ],
}

const dogs = [
  {
    img: 'https://frontend-take-home.fetch.com/dog-images/n02085620-Chihuahua/n02085620_10976.jpg',
    name: 'Emory',
    age: 10,
    breed: 'Chihuahua',
    zip_code: '48333',
    id: 'VXGFTIcBOvEgQ5OCx40W',
  },
  {
    img: 'https://frontend-take-home.fetch.com/dog-images/n02085620-Chihuahua/n02085620_11238.jpg',
    name: 'Jena',
    age: 8,
    breed: 'Chihuahua',
    zip_code: '25275',
    id: 'V3GFTIcBOvEgQ5OCx40W',
  },
  {
    img: 'https://frontend-take-home.fetch.com/dog-images/n02085620-Chihuahua/n02085620_11258.jpg',
    name: 'Jenifer',
    age: 14,
    breed: 'Chihuahua',
    zip_code: '11962',
    id: 'WHGFTIcBOvEgQ5OCx40W',
  },
  {
    img: 'https://frontend-take-home.fetch.com/dog-images/n02085620-Chihuahua/n02085620_1152.jpg',
    name: 'Carolyne',
    age: 3,
    breed: 'Chihuahua',
    zip_code: '17089',
    id: 'W3GFTIcBOvEgQ5OCx40W',
  },
  {
    img: 'https://frontend-take-home.fetch.com/dog-images/n02085620-Chihuahua/n02085620_1235.jpg',
    name: 'Brandy',
    age: 5,
    breed: 'Chihuahua',
    zip_code: '28451',
    id: 'YnGFTIcBOvEgQ5OCx40W',
  },
  {
    img: 'https://frontend-take-home.fetch.com/dog-images/n02085620-Chihuahua/n02085620_1271.jpg',
    name: 'Seamus',
    age: 2,
    breed: 'Chihuahua',
    zip_code: '09189',
    id: 'Y3GFTIcBOvEgQ5OCx40W',
  },
  {
    img: 'https://frontend-take-home.fetch.com/dog-images/n02085620-Chihuahua/n02085620_13383.jpg',
    name: 'Garnett',
    age: 0,
    breed: 'Chihuahua',
    zip_code: '52630',
    id: 'aHGFTIcBOvEgQ5OCx40W',
  },
  {
    img: 'https://frontend-take-home.fetch.com/dog-images/n02085620-Chihuahua/n02085620_1346.jpg',
    name: 'Keagan',
    age: 4,
    breed: 'Chihuahua',
    zip_code: '35574',
    id: 'aXGFTIcBOvEgQ5OCx40W',
  },
  {
    img: 'https://frontend-take-home.fetch.com/dog-images/n02085620-Chihuahua/n02085620_14413.jpg',
    name: 'Tito',
    age: 9,
    breed: 'Chihuahua',
    zip_code: '46814',
    id: 'bHGFTIcBOvEgQ5OCx40W',
  },
  {
    img: 'https://frontend-take-home.fetch.com/dog-images/n02085620-Chihuahua/n02085620_1455.jpg',
    name: 'Ila',
    age: 10,
    breed: 'Chihuahua',
    zip_code: '81047',
    id: 'bnGFTIcBOvEgQ5OCx40W',
  },
  {
    img: 'https://frontend-take-home.fetch.com/dog-images/n02085620-Chihuahua/n02085620_1558.jpg',
    name: 'Tracy',
    age: 13,
    breed: 'Chihuahua',
    zip_code: '71725',
    id: 'cXGFTIcBOvEgQ5OCx40W',
  },
  {
    img: 'https://frontend-take-home.fetch.com/dog-images/n02085620-Chihuahua/n02085620_1617.jpg',
    name: 'Kylie',
    age: 1,
    breed: 'Chihuahua',
    zip_code: '44222',
    id: 'c3GFTIcBOvEgQ5OCx40W',
  },
  {
    img: 'https://frontend-take-home.fetch.com/dog-images/n02085620-Chihuahua/n02085620_1620.jpg',
    name: 'Flo',
    age: 12,
    breed: 'Chihuahua',
    zip_code: '92013',
    id: 'dHGFTIcBOvEgQ5OCx40W',
  },
  {
    img: 'https://frontend-take-home.fetch.com/dog-images/n02085620-Chihuahua/n02085620_1816.jpg',
    name: 'Emilio',
    age: 12,
    breed: 'Chihuahua',
    zip_code: '07099',
    id: 'dnGFTIcBOvEgQ5OCx40W',
  },
  {
    img: 'https://frontend-take-home.fetch.com/dog-images/n02085620-Chihuahua/n02085620_1916.jpg',
    name: 'Julio',
    age: 8,
    breed: 'Chihuahua',
    zip_code: '23435',
    id: 'eHGFTIcBOvEgQ5OCx40W',
  },
  {
    img: 'https://frontend-take-home.fetch.com/dog-images/n02085620-Chihuahua/n02085620_275.jpg',
    name: 'Roxanne',
    age: 11,
    breed: 'Chihuahua',
    zip_code: '08020',
    id: 'h3GFTIcBOvEgQ5OCx40W',
  },
]

const mobileMenuOpen = ref(false)
const mobileFiltersOpen = ref(false)
</script>

<template>
  <div class="bg-gray-50">
    <div>
      <header class="relative">
        <nav aria-label="Top">
          <!-- Secondary navigation -->
          <div class="bg-white">
            <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div class="border-b border-gray-200">
                <div class="h-16 flex items-center justify-between">
                  <!-- Logo (lg+) -->
                  <div class="hidden lg:flex lg:items-center">
                    <a href="#">
                      <span class="sr-only">Second Chance</span>
                      <DogIcon />
                    </a>
                  </div>

                  <!-- Logo (lg-) -->
                  <a href="#" class="lg:hidden">
                    <span class="sr-only">Workflow</span>
                    <img
                      src="https://tailwindui.com/img/logos/workflow-mark.svg?color=indigo&shade=600"
                      alt=""
                      class="h-8 w-auto"
                    />
                  </a>

                  <div class="flex-1 flex items-center justify-end">
                    <div class="flex items-center lg:ml-8">
                      <div class="flex space-x-8">
                        <div class="flex">
                          <a
                            href="#"
                            class="-m-2 p-2 text-gray-400 hover:text-gray-500"
                          >
                            <span class="sr-only">Account</span>
                            <div
                              class="i-heroicons:user-20-solid w-6 h-6"
                              aria-hidden="true"
                            />
                          </a>
                        </div>
                      </div>

                      <span
                        class="mx-4 h-6 w-px bg-gray-200 lg:mx-6"
                        aria-hidden="true"
                      />

                      <div class="flow-root">
                        <a href="#" class="group -m-2 p-2 flex items-center">
                          <div
                            class="i-heroicons:heart flex-shrink-0 h-6 w-6 text-gray-400 group-hover:text-gray-500"
                            aria-hidden="true"
                          />
                          <span class="sr-only">items in cart, view bag</span>
                        </a>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </nav>
      </header>
    </div>

    <div>
      <main>
        <div class="bg-white">
          <div class="max-w-7xl mx-auto py-16 px-4 sm:px-6 lg:px-8">
            <h1 class="text-3xl font-extrabold tracking-tight text-gray-900">
              Title
            </h1>
            <p class="mt-4 max-w-xl text-sm text-gray-700">Description</p>
          </div>
        </div>

        <Filters />

        <!-- Product grid -->
        <section
          aria-labelledby="products-heading"
          class="max-w-2xl mx-auto pt-12 pb-16 px-4 sm:pt-16 sm:pb-24 sm:px-6 lg:max-w-7xl lg:px-8"
        >
          <h2 id="products-heading" class="sr-only">Products</h2>

          <div
            class="grid grid-cols-1 gap-y-10 sm:grid-cols-2 gap-x-6 lg:grid-cols-3 xl:grid-cols-4 xl:gap-x-8"
          >
            <a v-for="dog in dogs" :key="dog.id" href="#" class="group">
              <DogCard :dog="dog" />
            </a>
          </div>
        </section>
      </main>

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
              <div
                class="col-span-1 md:col-span-2 lg:row-start-1 lg:col-start-1"
              >
                <DogIcon />
              </div>

              <!-- Sitemap sections -->
              <div
                class="mt-10 col-span-6 grid grid-cols-2 gap-8 sm:grid-cols-3 md:mt-0 md:row-start-1 md:col-start-3 md:col-span-8 lg:col-start-2 lg:col-span-6"
              >
                <div
                  class="grid grid-cols-1 gap-y-12 sm:col-span-2 sm:grid-cols-2 sm:gap-x-8"
                >
                  <div>
                    <h3 class="text-sm font-medium text-gray-900">Products</h3>
                    <ul role="list" class="mt-6 space-y-6">
                      <li
                        v-for="item in footerNavigation.products"
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
                    <ul role="list" class="mt-6 space-y-6">
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
                  <h3 class="text-sm font-medium text-gray-900">
                    Customer Service
                  </h3>
                  <ul role="list" class="mt-6 space-y-6">
                    <li
                      v-for="item in footerNavigation.customerService"
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
                <h3 class="text-sm font-medium text-gray-900">
                  Sign up for our newsletter
                </h3>
                <p class="mt-6 text-sm text-gray-500">
                  The latest deals and savings, sent to your inbox weekly.
                </p>
                <form class="mt-2 flex sm:max-w-md">
                  <label for="email-address" class="sr-only"
                    >Email address</label
                  >
                  <input
                    id="email-address"
                    type="text"
                    autocomplete="email"
                    required=""
                    class="appearance-none min-w-0 w-full bg-white border border-gray-300 rounded-md shadow-sm py-2 px-4 text-base text-gray-900 placeholder-gray-500 focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500"
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

          <div class="border-t border-gray-100 py-10 text-center">
            <p class="text-sm text-gray-500">
              &copy; 2023 SecondChance, Inc. All rights reserved.
            </p>
          </div>
        </div>
      </footer>
    </div>
  </div>
</template>
