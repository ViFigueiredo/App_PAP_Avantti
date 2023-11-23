import { Loader } from '@googlemaps/js-api-loader'

export const inicializarMapa = async (lat, lng, apiKey) => {
  // New Map
  const loader = new Loader({
    apiKey,
    version: 'weekly'
    // ...additionalOptions
  })

  const options = {
    center: { lat, lng },
    zoom: 18
  }

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
  const detailWindow = new google.maps.InfoWindow({
    content: '<h2> Avantti Consultoria</h2>'
  })

  marker.addListener('mouseover', () => {
    detailWindow.open(map, marker)
  })
}
