<template>
  <div class="flex items-center justify-center min-h-screen bg-gray-100 overflow-auto">
    <form class="flex flex-col align-center justify-center bg-white p-8 rounded-lg shadow-md max-w-md" @submit.prevent="login">
      <div class="w-full flex justify-center align-center mb-6">
        <img src="@/assets/img/jnx_title_logo.png" alt="jnx_title_logo" class="px-10 w-80">
      </div>
      <h2 class="text-3xl font-extrabold mb-6 text-center text-gray-800">
        JNX - Entrar
      </h2>
      <div class="mb-4">
        <label
          for="username"
          class="block text-sm font-medium text-gray-600"
        >Nome de usuário:</label>
        <input
          id="username"
          v-model="username"
          type="text"
          class="mt-1 p-2 w-full border border-gray-300 rounded-md focus:outline-none focus:border-blue-500"
          required
        >
      </div>
      <div class="mb-6">
        <label for="password" class="block text-sm font-medium text-gray-600">Senha:</label>
        <input
          id="password"
          v-model="password"
          type="password"
          class="mt-1 p-2 w-full border border-gray-300 rounded-md focus:outline-none focus:border-blue-500"
          required
        >
      </div>
      <nuxt-link to="/">
        <button
          type="submit"
          class="bg-blue-500 text-white p-3 rounded-md w-full hover:bg-blue-600 focus:outline-none focus:border-blue-700 focus:ring focus:ring-blue-200"
        >
          Login
        </button>
      </nuxt-link>
    </form>
  </div>
</template>

<script setup>
const username = ''
const password = ''

const login = () => alert('Login realizado com sucesso!')
</script>
