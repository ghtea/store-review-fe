import { call, select } from 'redux-saga/effects';
import { RootState } from '../../../reducers';

import * as actions from '../../actions';
import { DEFAULT_COORDS, getCurrentPosition } from '../initMainMap/getCurrentPosition';

export function* moveMap(action: actions.MOVE_MAP_Instance) {
  const payload = action.payload

  const mainMap: kakao.maps.Map | undefined = yield select(
    (state: RootState) => state.place.mainMap
  );

  if (!kakao || !mainMap) return;

  let destinationLatLng = undefined

  if (payload.coords){
    destinationLatLng = new kakao.maps.LatLng(payload.coords.latitude, payload.coords.longitude)
  }

  if (payload.isCurrent){
    try {
      const currentPosition: GeolocationPosition = yield call(getCurrentPosition);
  
      destinationLatLng = new kakao.maps.LatLng(currentPosition.coords.latitude, currentPosition.coords.longitude)
    }
    catch (error){
      console.log("getting current location has failed")
    }
  }

  if (!destinationLatLng) {
    destinationLatLng = new kakao.maps.LatLng(DEFAULT_COORDS.latitude, DEFAULT_COORDS.longitude)
  }
  
  mainMap.setCenter(destinationLatLng)
}