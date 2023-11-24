<template>
  <div>
    <Header />
    <div class="flex flex-col bg-gray-200 p-0 m-0 overflow-hidden flex justify-center items-center h-screen">
      <button v-if="!showFingerprint" type="button" class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-20 px-14 rounded-full focus:outline-none focus:shadow-outline-blue active:bg-blue-800" @click="checkIn">
        <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@24,400,0,0" />
        <span class="fingerprint material-symbols-outlined">
          fingerprint
        </span>
      </button>

      <h1 v-if="!showFingerprint" class="mt-8 text-center">
        FAÇA CHECK-IN PARA OBTER OS DADOS DA SUA LOCALIDADE
      </h1>

      <div v-if="getCoords" class="mt-8 text-center">
        <div id="map"></div>
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
#map {
  height: 400px;
  width: 500px;
}

.fingerprint {
  font-size: 5rem;
}

</style>
