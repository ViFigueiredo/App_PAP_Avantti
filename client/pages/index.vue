<template>
  <div>
    <Header />
    <div class="main-component-page flex flex-col bg-gray-200 p-0 overflow-hidden items-center h-screen w-screen z-0">
      <div v-if="!showFingerprint" class="flex flex-col justify-center items-center h-screen">
        <h1 class="mx-5 mb-20 text-center font-bold">
          FAÇA CHECK-IN PARA OBTER OS DADOS DA SUA LOCALIDADE
        </h1>

        <button type="button" class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-20 px-14 rounded-full focus:outline-none focus:shadow-outline-blue active:bg-blue-800" @click="checkInMark">
          <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@24,400,0,0" />
          <span class="material-symbols-outlined">
            <span class="text-7xl">fingerprint</span>
          </span>
        </button>
      </div>

      <div class="h-60"></div>

      <div v-if="showCoords" class="absolute mt-10 text-center w-4/5">
        <div id="map" class="h-96 w-sreen"></div>
        <div>
          <p v-if="!coordsStatus" class="mt-5">
            Latitude: {{ localizacao.latitude }} <br>
            Longitude: {{ localizacao.longitude }} <br>
            <!-- Endereço: {{ endereco }} -->
          </p>
        </div>
        <button type="button" class="bg-blue-500 hover:bg-blue-700 text-white font-bold mt-10 py-6 px-10 rounded-full focus:outline-none focus:shadow-outline-blue active:bg-blue-800" @click="checkOutMark">
          CHECK-OUT
        </button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { getLocation } from '@/services/Geolocation'
import { inicializarMapa } from '@/services/Maps'

const runtimeConfig = useRuntimeConfig()
const apiKey = runtimeConfig.public.GOOGLE_MAPS_KEY
const localizacao = ref(null)
const coordsStatus = ref(false)
const showCoords = ref(false)
const showFingerprint = ref(false)
const checkStatus = false

onMounted(() => {
  const checkIn = JSON.parse(localStorage.getItem('checkIn')) || {}

  if (Object.keys(checkIn).length > 0) {
    showCoords.value = checkIn.showCoords || false
    coordsStatus.value = checkIn.coordsStatus || false
    showFingerprint.value = checkIn.showFingerprint || false
    localizacao.value = checkIn.localizacao || null
    inicializarMapa(localizacao.value.latitude, localizacao.value.longitude, apiKey)
  }
})

const checkInMark = async () => {
  localStorage.removeItem('checkIn')
  const coords = await getLocation()

  if (coords.err) {
    return alert(coords.errorMsg)
  }

  showCoords.value = true
  coordsStatus.value = coords.err
  showFingerprint.value = true
  localizacao.value = coords.location

  if (localizacao.value) {
    inicializarMapa(localizacao.value.latitude, localizacao.value.longitude, apiKey)
  }

  const checkInData = {
    checkStatus,
    showCoords: showCoords.value,
    coordsStatus: coordsStatus.value,
    showFingerprint: showFingerprint.value,
    localizacao: localizacao.value
  }

  localStorage.setItem('checkIn', JSON.stringify(checkInData))
}

const checkOutMark = () => {
  localStorage.removeItem('checkIn')
  location.reload()
}
</script>
