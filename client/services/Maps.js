/* eslint-disable no-prototype-builtins */
import { Loader } from '@googlemaps/js-api-loader'
import { geocodeAddress } from '@/services/GeocodeAddress'
import { Empresas } from '@/services/Empresas'

export const inicializarMapa = async (lat, lng, apiKey) => {
  const map = await criarMapa(lat, lng, apiKey)
  const iconPath = 'https://res.cloudinary.com/dkwnozyux/image/upload/v1701345220/location_blue.png'
  const textIcon = '<h2> Avantti Consultoria</h2>'
  adicionarInfoWindow(adicionarMarker(map, lat, lng, iconPath), map, textIcon)

  const objEmpresas = Empresas()
  for (const empresa in objEmpresas) {
    if (objEmpresas.hasOwnProperty(empresa)) {
      const detalhes = objEmpresas[empresa]
      const endereco = detalhes.endereco
      await geocodeAddress(endereco, apiKey)
        .then((coordenadas) => {
          const iconText = detalhes.nome
          const iconPath = 'https://res.cloudinary.com/dkwnozyux/image/upload/v1700684417/location_red.png'
          adicionarInfoWindow(adicionarMarker(map, coordenadas.lat, coordenadas.lng, iconPath), map, iconText)
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

const adicionarMarker = (map, lat, lng, iconPath) => {
  return new google.maps.Marker({
    position: { lat, lng },
    map,
    icon: iconPath
  })
}

const adicionarInfoWindow = (marker, map, text) => {
  const detailWindow = new google.maps.InfoWindow({
    content: text
  })

  marker.addListener('mouseover', () => {
    detailWindow.open(map, marker)
  })

  marker.addListener('mouseout', () => {
    detailWindow.close()
  })
}
