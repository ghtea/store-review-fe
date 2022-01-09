import { call, select } from 'redux-saga/effects';
import { RootState } from '../../../reducers';

import * as actions from '../../actions';
import { DEFAULT_COORDS, getCurrentPosition } from '../initMainMap/getCurrentPosition';

export function* moveMap(action: actions.MOVE_MAP_Instance) {
  const payload = action.payload

  if (!naver) return;

  const mainMap: naver.maps.Map = yield select(
    (state: RootState) => state.place.mainMap
  );

  let destinationLatLng = undefined
  
  if (payload.point){
    const tm128Location = new naver.maps.Point(payload.point.x, payload.point.y)
    destinationLatLng = naver.maps.TransCoord.fromTM128ToLatLng(tm128Location);
  }

  if (payload.coords){
    destinationLatLng = new naver.maps.LatLng(payload.coords.latitude, payload.coords.latitude)
  }

  if (payload.isCurrent){
    try {
      const currentPosition: GeolocationPosition = yield call(getCurrentPosition);
  
      destinationLatLng = new naver.maps.LatLng(currentPosition.coords.latitude, currentPosition.coords.latitude)
    }
    catch (error){
      console.log("getting current location has failed")
    }
  }

  if (!destinationLatLng) {
    destinationLatLng = new naver.maps.LatLng(DEFAULT_COORDS.latitude, DEFAULT_COORDS.longitude)
  }
  
  
  mainMap.setCenter(destinationLatLng)
}