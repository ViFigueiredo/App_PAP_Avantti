export function converterCoordenadas (latitude, longitude, apiKey) {
  const coordenadas = `${latitude},${longitude}`
  const url = `https://maps.googleapis.com/maps/api/geocode/json?latlng=${coordenadas}&key=${apiKey}`

  fetch(url)
    .then(response => response.json())
    .then((data) => {
      if (data.results && data.results.length > 0) {
        const endereco = data.results[0].formatted_address
        return endereco
      } else {
        return { status: false, msg: 'Endereço não encontrado' }
      }
    })
    .catch((error) => {
      return { status: false, msg: 'Erro ao converter coordenadas:', err: error }
    })
}
