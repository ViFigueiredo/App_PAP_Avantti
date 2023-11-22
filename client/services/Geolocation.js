export function obterLocalizacao () {
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(exibirLocalizacao, tratarErro)
  } else {
    alert('Geolocalização não é suportada pelo seu navegador.')
  }
}

export function exibirLocalizacao (posicao) {
  const latitude = posicao.coords.latitude
  const longitude = posicao.coords.longitude

  console.log('Latitude: ' + latitude)
  console.log('Longitude: ' + longitude)

  // Aqui você pode usar a API do Google para fazer mais coisas com a localização
  // Por exemplo, fazer uma solicitação para o Google Maps API para obter detalhes adicionais.

  // Exemplo de como usar a API do Google Maps para obter o endereço a partir das coordenadas:
  // var url = "https://maps.googleapis.com/maps/api/geocode/json?latlng=" + latitude + "," + longitude + "&key=SUA_CHAVE_API";
  // fetch(url)
  //     .then(response => response.json())
  //     .then(data => console.log(data));
}

export function tratarErro (erro) {
  switch (erro.code) {
    case erro.PERMISSION_DENIED:
      alert('Permissão para obter a localização foi negada pelo usuário.')
      break
    case erro.POSITION_UNAVAILABLE:
      alert('Informações de localização estão indisponíveis.')
      break
    case erro.TIMEOUT:
      alert('Tempo limite expirado para obter a localização.')
      break
    case erro.UNKNOWN_ERROR:
      alert('Ocorreu um erro desconhecido ao obter a localização.')
      break
  }
}
