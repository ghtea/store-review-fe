import {searchPlaces} from './searchPlaces';
import * as actions from "../actions"
import { takeEvery } from 'redux-saga/effects';
import { initMainMap } from './initMainMap';
import { moveMap } from './movoMap';
import { addMarkers } from './addMarkers';

export function* placeSaga() {
  yield takeEvery(actions.SEARCH_PLACES, searchPlaces);  
  yield takeEvery(actions.INIT_MAIN_MAP, initMainMap);
  yield takeEvery(actions.MOVE_MAP, moveMap);
  yield takeEvery(actions.ADD_MARKERS, addMarkers);
}