import { call, put } from 'redux-saga/effects';

import * as actions from '../../actions';
import {DEFAULT_COORDS, getCurrentPosition} from "./getCurrentPosition"

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