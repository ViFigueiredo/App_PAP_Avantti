<template>
  <div>
    <Header />
    <div class="flex flex-col bg-gray-200 p-0 m-0 overflow-hidden flex justify-center items-center h-screen" @click="checkIn">
      <button type="button" class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-20 px-14 rounded-full focus:outline-none focus:shadow-outline-blue active:bg-blue-800">
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
import { Loader } from '@googlemaps/js-api-loader'

const localizacao = ref(null)
const erro = ref(null)
const erroMensagem = ref('')
const showCoords = ref(false)

const obterLocalizacao = () => {
  showCoords.value = true
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(
      (posicao) => {
        localizacao.value = {
          latitude: posicao.coords.latitude,
          longitude: posicao.coords.longitude
        }
        inicializarMapa(localizacao.value.latitude, localizacao.value.longitude)
      },
      (erro) => {
        erroMensagem.value = tratarErro(erro)
        erro.value = true
      }
    )
  } else {
    erroMensagem.value = 'Geolocalização não é suportada pelo seu navegador.'
    erro.value = true
  }
}

const tratarErro = (erro) => {
  switch (erro.code) {
    case erro.PERMISSION_DENIED:
      return 'Permissão para obter a localização foi negada pelo usuário.'
    case erro.POSITION_UNAVAILABLE:
      return 'Informações de localização estão indisponíveis.'
    case erro.TIMEOUT:
      return 'Tempo limite expirado para obter a localização.'
    case erro.UNKNOWN_ERROR:
      return 'Ocorreu um erro desconhecido ao obter a localização.'
    default:
      return 'Erro ao obter a localização.'
  }
}

const inicializarMapa = async (lat, lng) => {
  const runtimeConfig = useRuntimeConfig()

  const loader = new Loader({
    apiKey: runtimeConfig.public.GOOGLE_MAPS_KEY,
    version: 'weekly'
    // ...additionalOptions
  })

  // Map Options
  const options = {
    center: { lat, lng },
    zoom: 18
  }

  // New Map
  loader.load()
  const { Map } = await google.maps.importLibrary('maps')
  const map = new Map(document.getElementById('map'), options)

  // Marker
  const marker = new google.maps.Marker({
    position: { lat, lng },
    map,
    icon: 'https://res.cloudinary.com/dkwnozyux/image/upload/v1700684417/placeholder_zrrlht.png'
  })

  // Info Window
  // const detailWindow = new google.maps.InfoWindow({
  //   content: '<h2> Avantti Consultoria</h2>'
  // })

  // marker.addListener('click', () => {
  //   detailWindow.open(map, marker)
  // })
}

const checkIn = async () => await obterLocalizacao()
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
