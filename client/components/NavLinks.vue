<template>
  <div>
    <ul class="flex flex-col font-medium p-4 md:p-0 mt-4 border border-gray-100 rounded-lg bg-gray-50 md:space-x-8 rtl:space-x-reverse md:flex-row md:mt-0 md:border-0 md:bg-white dark:bg-gray-800 md:dark:bg-gray-900 dark:border-gray-700">
      <li :class="{ 'block py-2 px-3 text-white bg-blue-700 rounded md:bg-transparent md:text-blue-700 md:p-0 md:dark:text-blue-500': $route.path === '/' }">
        <nuxt-link to="/">
          Dashboard
        </nuxt-link>
      </li>
      <li :class="{ 'block py-2 px-3 text-white bg-blue-700 rounded md:bg-transparent md:text-blue-700 md:p-0 md:dark:text-blue-500': $route.path === '/customers-region' }">
        <nuxt-link to="/customers-region">
          Clientes/Região
        </nuxt-link>
      </li>
      <li :class="{ 'block py-2 px-3 text-white bg-blue-700 rounded md:bg-transparent md:text-blue-700 md:p-0 md:dark:text-blue-500': $route.path === '/sales' }">
        <nuxt-link to="/sales">
          Vendas
        </nuxt-link>
      </li>
    </ul>
  </div>
</template>
