/* eslint-disable prefer-promise-reject-errors */

// Função para converter endereço em coordenadas usando a API do Google Maps
export const geocodeAddress = (address, apiKey) => {
  // Construa a URL da API de geocodificação
  const geocodingUrl = `https://maps.googleapis.com/maps/api/geocode/json?address=${encodeURIComponent(address)}&key=${apiKey}`

  // Retorna uma Promise que resolve com as coordenadas ou rejeita em caso de erro
  return new Promise((resolve, reject) => {
    // Faça uma solicitação AJAX para a API do Google Maps
    fetch(geocodingUrl)
      .then(response => response.json())
      .then((data) => {
        // Verifique se a solicitação foi bem-sucedida
        if (data.status === 'OK') {
          // Obtenha as coordenadas do primeiro resultado
          const location = data.results[0].geometry.location

          // Resolva a Promise com as coordenadas
          resolve({
            lat: location.lat,
            lng: location.lng
          })
        } else {
          // Se houver um erro, rejeite a Promise com uma mensagem de erro
          reject(`Erro na geocodificação: ${data.status}`)
        }
      })
      .catch((error) => {
        // Se houver um erro na solicitação AJAX, rejeite a Promise com o erro
        reject(`Erro na solicitação AJAX: ${error}`)
      })
  })
}
