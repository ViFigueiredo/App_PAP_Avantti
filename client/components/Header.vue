<template>
  <nav class="relative bg-white border-gray-200 dark:bg-gray-900 w-full absolute z-10">
    <div class="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
      <a href="" class="flex items-center space-x-3 rtl:space-x-reverse">
        <img src="@/assets/img/jnx_logo.png" class="jnx-logo h-10" alt="">
        <span class="self-center text-2xl font-semibold whitespace-nowrap dark:text-white">JNX Sales</span>
      </a>

      <div class="nav-wrapper flex">
        <div id="navbar-user" class="items-center justify-between hidden w-full md:flex md:w-auto md:order-1 mr-10">
          <NavLinks />
        </div>

        <div
          v-if="!menuMobile"
          id="dropMenuBase"
          class="flex items-center md:order-2 space-x-3 md:space-x-0 rtl:space-x-reverse"
        >
          <SearchBar class="w-[300px] mr-5" />

          <button
            id="user-menu-button"
            type="button"
            class="flex text-sm bg-gray-800 rounded-full md:me-0 focus:ring-4 focus:ring-gray-300 dark:focus:ring-gray-600"
            aria-expanded="false"
            data-dropdown-toggle="user-dropdown"
            data-dropdown-placement="bottom"
            @click="showDropdown"
          >
            <img class="w-8 h-8 rounded-full" :src="imgUser" alt="user photo">
          </button>

          <!-- menu user -->
          <div v-if="dropMenu" id="user-dropdown" class=" absolute top-11 right-0 z-50 my-4 text-base list-none bg-white divide-y divide-gray-100 rounded-lg shadow dark:bg-gray-700 dark:divide-gray-600">
            <div class="px-4 py-3">
              <span class="block text-sm text-gray-900 dark:text-white">{{ userName }}</span>
              <span class="block text-sm  text-gray-500 truncate dark:text-gray-400">{{ userEmail }}</span>
            </div>
            <ul class="py-2" aria-labelledby="user-menu-button">
              <nuxt-link to="">
                <li class="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white">
                  Configurações
                </li>
              </nuxt-link>

              <nuxt-link to="/auth">
                <li class="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white">
                  Sair
                </li>
              </nuxt-link>
            </ul>
          </div>

          <!-- menu mobile -->
          <button
            data-collapse-toggle="navbar-user"
            type="button"
            class="inline-flex items-center p-2 w-10 h-10 justify-center text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600"
            aria-controls="navbar-user"
            aria-expanded="false"
            @click="toggleMenuMobile"
          >
            <svg class="w-5 h-5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 17 14">
              <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M1 1h15M1 7h15M1 13h15" />
            </svg>
          </button>
        </div>
      </div>
    </div>

    <div v-if="menuMobile" class="absolute top-0 right-0 h-screen w-1/2 bg-gray-500/75">
      <span class="absolute right-0 text-right font-bold text-white m-5 cursor-pointer border rounded py-1 px-3" @click="toggleMenuMobile">
        X
      </span>
      <NavLinks class="mt-20 text-right" />
    </div>
  </nav>
</template>

<script setup>
import { ref, onMounted } from 'vue'

const dropMenu = ref(false)
const imgUser = ref('')
const userName = ref('')
const userEmail = ref('')
const menuMobile = ref(false)

const showDropdown = () => {
  dropMenu.value = !dropMenu.value
}

const toggleMenuMobile = () => {
  menuMobile.value = !menuMobile.value
}

onMounted(() => {
  imgUser.value = 'https://avatars.githubusercontent.com/u/67883343?s=96&v=4'
  userName.value = 'Vinicius Figueiredo'
  userEmail.value = 'ti02@avantticonsultoria.com.br'
})

</script>
