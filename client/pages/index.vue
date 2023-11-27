<template>
  <div>
    <Header />
    <div class="relative flex flex-col bg-gray-200 p-0 overflow-hidden items-center h-screen w-screen">
      <div class="flex flex-col justify-center items-center h-screen">
        <h1 v-if="!showFingerprint" class="mb-20 text-center font-bold">
          FAÇA CHECK-IN PARA OBTER OS DADOS DA SUA LOCALIDADE
        </h1>

        <button v-if="!showFingerprint" type="button" class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-20 px-14 rounded-full focus:outline-none focus:shadow-outline-blue active:bg-blue-800" @click="checkIn">
          <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@24,400,0,0" />
          <span class="material-symbols-outlined">
            <span class="text-7xl">fingerprint</span>
          </span>
        </button>
      </div>

      <div class="h-60"></div>

      <div v-if="getCoords" class="absolute top-10 text-center w-4/5">
        <div id="map" class="h-96 w-sreen"></div>
        <div>
          <p v-if="erro">
            Erro ao obter a localização: {{ erroMensagem }}
          </p>
          <p v-else class="mt-5">
            <!-- Latitude: {{ latitude }} <br>
            Longitude: {{ longitude }} <br> -->
            Endereço: {{ endereco }}
          </p>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { obterLocalizacao } from '@/services/Geolocation'
import { inicializarMapa } from '@/services/Maps'
// import { converterCoordenadas } from '@/services/Address'

const runtimeConfig = useRuntimeConfig()
const apiKey = runtimeConfig.public.GOOGLE_MAPS_KEY
const localizacao = ref(null)
const endereco = ref(null)
const erro = ref(null)
const erroMensagem = ref('')
const getCoords = ref(false)
const showFingerprint = ref(false)

const checkIn = async () => {
  await obterLocalizacao(getCoords, showFingerprint, localizacao, erro, erroMensagem, inicializarMapa, apiKey)
}
</script>

<style scoped>
/* #map {
  height: 400px;
  width: 500px;
} */

/* .fingerprint {
  font-size: 5rem;
} */

</style>
