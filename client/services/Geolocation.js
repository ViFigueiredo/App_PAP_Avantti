export const obterLocalizacao = (showCoords, localizacao, erro, erroMensagem, inicializarMapa, apiKey) => {
  showCoords.value = true
  showFingerprint.value = true
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(
      (posicao) => {
        localizacao.value = {
          latitude: posicao.coords.latitude,
          longitude: posicao.coords.longitude
        }
        inicializarMapa(localizacao.value.latitude, localizacao.value.longitude, apiKey)
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

export const tratarErro = (erro) => {
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
