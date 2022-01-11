
export const getCurrentPosition = (options?: PositionOptions) => {
  return new Promise((resolve, reject)=>{
    if (!navigator.geolocation){
      reject()
    }
    else {
      navigator.geolocation.getCurrentPosition(resolve, reject, options)
    }
  })
}

export const DEFAULT_COORDS = {
  latitude: 37.532600,
  longitude: 127.024612,
}