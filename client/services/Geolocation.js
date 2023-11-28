export const getLocation = async () => {
  try {
    if (navigator.geolocation) {
      const position = await new Promise((resolve, reject) => {
        navigator.geolocation.getCurrentPosition(resolve, reject)
      })

      const location = {
        latitude: position.coords.latitude,
        longitude: position.coords.longitude
      }

      return { location, err: false, errorMsg: null }
    }
  } catch (error) {
    return { location: null, err: true, errorMsg: tratarErro(error) }
  }
}

export const tratarErro = (error) => {
  switch (error.code) {
    case error.PERMISSION_DENIED:
      return 'Permissão para obter a localização foi negada pelo usuário.'
    case error.POSITION_UNAVAILABLE:
      return 'Informações de localização estão indisponíveis.'
    case error.TIMEOUT:
      return 'Tempo limite expirado para obter a localização.'
    case error.UNKNOWN_ERROR:
      return 'Ocorreu um erro desconhecido ao obter a localização.'
    default:
      return 'Geolocalização não é suportada pelo seu navegador.'
  }
}
