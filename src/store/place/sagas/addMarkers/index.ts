import { put, select } from 'redux-saga/effects';
import { RootState } from '../../../reducers';

import * as actions from '../../actions';

export function* addMarkers(action: actions.ADD_MARKERS_Instance) {
  const payload = action.payload
  const mainMap: kakao.maps.Map | undefined = yield select(
    (state: RootState) => state.place.mainMap
  );

  if (!kakao || !mainMap) return;

  // remove old markers
  const previousMarkers: kakao.maps.Marker[] = yield select(
    (state: RootState) => state.place.markers
  );
  previousMarkers.forEach(item => {
    item.setMap(null)
  })

  const newMarkers: kakao.maps.Marker[] = []

  payload.items.forEach(item => {
    const mapLatLng = new kakao.maps.LatLng(item.coords.latitude, item.coords.longitude);
    const newMarker = new kakao.maps.Marker({
      position: mapLatLng,
      opacity: 1,
    });
  
    newMarker.setMap(mainMap);
    newMarkers.push(newMarker)
  })

  yield put(
    actions.return__REPLACE({
      keyList: ['markers'],
      replacement: newMarkers
    }),
  );
}