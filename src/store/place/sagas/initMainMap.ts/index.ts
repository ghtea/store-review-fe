import { call, put } from 'redux-saga/effects';

import * as actions from '../../actions';

export function* initMainMap(action: actions.INIT_MAIN_MAP_Instance) {

  if (!naver) {
    yield put(
      actions.return__REPLACE({
        keyList: ['mainMap'],
        replacement: undefined
      }),
    );
  }
  else {

    let coords = {
      latitude: 37.532600,
      longitude: 127.024612,
    }

    try {
      const position: GeolocationPosition = yield call(getPosition);

      coords = {
        latitude: position.coords.latitude,
        longitude: position.coords.longitude,
      }
    }
    catch (error){
      console.log("getting current location has failed")
    }
    
    const mapOption = {
      center: new naver.maps.LatLng(coords.latitude, coords.longitude),
      zoom: 14
    }

    const map = new naver.maps.Map("mainMap", mapOption);

    yield put(
      actions.return__REPLACE({
        keyList: ['mainMap'],
        replacement: map
      }),
    );
  }
}

const getPosition = (options?: PositionOptions) => {
  return new Promise((resolve, reject)=>{
    if (!navigator.geolocation){
      reject()
    }
    else {
      navigator.geolocation.getCurrentPosition(resolve, reject, options)
    }
  })
}