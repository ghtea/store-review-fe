import { call, put } from 'redux-saga/effects';

import * as actions from '../../actions';
import { DEFAULT_COORDS, getCurrentPosition } from "./getCurrentPosition"

export function* initMainMap(action: actions.INIT_MAIN_MAP_Instance) {

  if (!kakao) {
    yield put(
      actions.return__REPLACE({
        keyList: ['mainMap'],
        replacement: undefined
      }),
    );
  }
  else {

    let coords = DEFAULT_COORDS

    try {
      const position: GeolocationPosition = yield call(getCurrentPosition);

      coords = {
        latitude: position.coords.latitude,
        longitude: position.coords.longitude,
      }
    }
    catch (error){
      console.log("getting current location has failed")
    }
    
    const container = document.getElementById('mainMap'); 
    const options = { 
      center: new kakao.maps.LatLng(coords.latitude, coords.longitude), //지도의 중심좌표.
      level: 5 
    };

    if (!container) return

    const map = new kakao.maps.Map(container, options);

    yield put(
      actions.return__REPLACE({
        keyList: ['mainMap'],
        replacement: map
      }),
    );
  }
}