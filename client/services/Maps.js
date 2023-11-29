/* eslint-disable no-prototype-builtins */
import { Loader } from '@googlemaps/js-api-loader'
import { geocodeAddress } from '@/services/GeocodeAddress'
import { Empresas } from '@/services/Empresas'

export const inicializarMapa = async (lat, lng, apiKey) => {
  const map = await criarMapa(lat, lng, apiKey)
  adicionarInfoWindow(adicionarMarker(map, lat, lng), map)

  const objEmpresas = Empresas()
  for (const empresa in objEmpresas) {
    if (objEmpresas.hasOwnProperty(empresa)) {
      const detalhes = objEmpresas[empresa]
      const endereco = detalhes.endereco
      await geocodeAddress(endereco, apiKey)
        .then((coordenadas) => {
          console.log(coordenadas)
          adicionarInfoWindow(adicionarMarker(map, coordenadas.lat, coordenadas.lng), map)
        })
        .catch((error) => {
          console.log(`Não foi possível obter coordenadas para o endereço ${endereco.value}. Erro: ${error}`)
        })
    }
  }
}

const criarMapa = async (lat, lng, apiKey) => {
  const loader = new Loader({
    apiKey,
    version: 'weekly'
    // ...additionalOptions
  })

  const options = {
    center: { lat, lng },
    zoom: 17
  }

  loader.load()
  const { Map } = await google.maps.importLibrary('maps')
  return new Map(document.getElementById('map'), options)
}

const adicionarMarker = (map, lat, lng) => {
  return new google.maps.Marker({
    position: { lat, lng },
    map,
    icon: 'https://res.cloudinary.com/dkwnozyux/image/upload/v1700684417/placeholder_zrrlht.png'
  })
}

const adicionarInfoWindow = (marker, map) => {
  const detailWindow = new google.maps.InfoWindow({
    content: '<h2> Avantti Consultoria</h2>'
  })

  marker.addListener('mouseover', () => {
    detailWindow.open(map, marker)
  })
}
