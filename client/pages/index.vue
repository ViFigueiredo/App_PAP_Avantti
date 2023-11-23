<template>
  <div>
    <Header />
    <div class="flex flex-col bg-gray-200 p-0 m-0 overflow-hidden flex justify-center items-center h-screen">
      <button type="button" class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-20 px-14 rounded-full focus:outline-none focus:shadow-outline-blue active:bg-blue-800" @click="checkIn">
        CHECK IN
      </button>

      <div v-if="showCoords" class="mt-8 text-center">
        <p v-if="erro">
          Erro ao obter a localização: {{ erroMensagem }}
        </p>
        <p v-if="localizacao">
          Latitude: {{ localizacao.latitude }}, Longitude: {{ localizacao.longitude }}
        </p>
        <div id="map" class="mt-5"></div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { obterLocalizacao } from '@/services/Geolocation'
import { inicializarMapa } from '@/services/Maps'

const runtimeConfig = useRuntimeConfig()
const apiKey = runtimeConfig.public.GOOGLE_MAPS_KEY

const localizacao = ref(null)
const erro = ref(null)
const erroMensagem = ref('')
const showCoords = ref(false)

const checkIn = async () => await obterLocalizacao(showCoords, localizacao, erro, erroMensagem, inicializarMapa, apiKey)
</script>

<style scoped>
nav {
  position: absolute;
  width: 100%;
}

#map {
  height: 400px;
  width: 500px;
}
</style>
