<template>
  <div>
    <Header />
    <div class="main-component-page flex flex-col bg-gray-100 items-center h-screen w-screen z-0">
      <div v-if="!showFingerprint" class="flex flex-col mt-20 items-center h-screen w-screen">
        <h1 class="mx-5 mb-20 text-center font-bold">
          CLIQUE NO BOTÃO ABAIXO PARA OBTER OS DADOS DA SUA LOCALIDADE
        </h1>

        <button type="button" class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-20 px-10 rounded-full focus:outline-none focus:shadow-outline-blue active:bg-blue-800" @click="locationMarkStart">
          <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@24,400,0,0" />
          <span class="material-symbols-outlined">
            <span class="text-6xl">fingerprint</span>
          </span>
        </button>
      </div>

      <div v-if="showCoords" class="absolute flex justify-center align-center mt-5 px-10 space-x-10 text-center w-screen ">
        <div class="flex flex-col space-y-6 w-1/3">
          <div id="map" class="h-80 w-auto relative overflow-x-auto shadow-md sm:rounded-lg"></div>

          <div>
            <p v-if="!coordsStatus" class="">
              Latitude: {{ localizacao.latitude }} <br>
              Longitude: {{ localizacao.longitude }} <br>
              <!-- Endereço: {{ endereco }} -->
            </p>
          </div>

          <div>
            <button type="button" class="bg-blue-500 hover:bg-blue-700 text-white font-bold w-[200px] rounded-full focus:outline-none focus:shadow-outline-blue active:bg-blue-800" @click="locationMarkSEnd">
              FINALIZAR REGIÃO
            </button>
          </div>
        </div>

        <div class="overflow-auto max-h-[474px] shadow-md sm:rounded-lg">
          <table class="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
            <thead class="text-xs text-gray-700 uppercase underline bg-gray-300 dark:bg-gray-800 dark:text-gray-400 sticky top-0">
              <tr>
                <th scope="col" class="px-6 py-3">
                  Empresa
                </th>
                <th scope="col" class="px-6 py-3">
                  Endereço
                </th>
                <th scope="col" class="px-6 py-3">
                  Status
                </th>
                <th scope="col" class="px-6 py-3">
                  Ações
                </th>
              </tr>
            </thead>
            <tbody class="overflow-y-auto">
              <tr v-for="(empresa, index) in empresas" :key="index" class="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600 cursor-pointer">
                <td scope="row" class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                  {{ empresa.nome }}
                </td>
                <td class="px-6 py-4">
                  {{ empresa.endereco }}
                </td>
                <td class="px-6 py-4">
                  {{ empresa.status }}
                </td>
                <td class="flex space-x-3 px-6 py-4">
                  <button type="button">
                    <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@24,400,0,0" />
                    <span class="material-symbols-outlined">
                      not_listed_location
                    </span>
                  </button>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
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

const empresas = {
  empresa1: {
    nome: 'Avantti Consultoria',
    endereco: 'Rua José Paraíso, 58 - Boa Viagem',
    status: 'Disponível'
  },
  empresa2: {
    nome: 'Shopping Recife',
    endereco: 'Av. Sofia Neves, 13 - Tancredo Neves',
    status: 'Em negociação'
  },
  empresa3: {
    nome: 'Dona Lindu',
    endereco: 'Av. Mascarenhas de Morais, 145 - Boa Viagem',
    status: 'Disponível'
  },
  empresa4: {
    nome: 'Dona Lindu',
    endereco: 'Av. Mascarenhas de Morais, 145 - Boa Viagem',
    status: 'Disponível'
  },
  empresa5: {
    nome: 'Dona Lindu',
    endereco: 'Av. Mascarenhas de Morais, 145 - Boa Viagem',
    status: 'Disponível'
  },
  empresa6: {
    nome: 'Dona Lindu',
    endereco: 'Av. Mascarenhas de Morais, 145 - Boa Viagem',
    status: 'Disponível'
  },
  empresa7: {
    nome: 'Dona Lindu',
    endereco: 'Av. Mascarenhas de Morais, 145 - Boa Viagem',
    status: 'Disponível'
  },
  empresa8: {
    nome: 'Dona Lindu',
    endereco: 'Av. Mascarenhas de Morais, 145 - Boa Viagem',
    status: 'Disponível'
  },
  empresa9: {
    nome: 'Dona Lindu',
    endereco: 'Av. Mascarenhas de Morais, 145 - Boa Viagem',
    status: 'Disponível'
  },
  empresa10: {
    nome: 'Dona Lindu',
    endereco: 'Av. Mascarenhas de Morais, 145 - Boa Viagem',
    status: 'Disponível'
  }
}

onMounted(() => {
  const checkIn = JSON.parse(localStorage.getItem('locationMark')) || {}

  if (Object.keys(checkIn).length > 0) {
    showCoords.value = checkIn.showCoords || false
    coordsStatus.value = checkIn.coordsStatus || false
    showFingerprint.value = checkIn.showFingerprint || false
    localizacao.value = checkIn.localizacao || null
    inicializarMapa(localizacao.value.latitude, localizacao.value.longitude, apiKey)
  }
})

const locationMarkStart = async () => {
  localStorage.removeItem('locationMark')
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

  localStorage.setItem('locationMark', JSON.stringify(checkInData))
}

const locationMarkSEnd = () => {
  localStorage.removeItem('locationMark')
  location.reload()
}
</script>

<style scoped>
/* .table-container thead th {
  position: sticky;
  top: 0;
  background-color: #f8f9fa;
} */
</style>
