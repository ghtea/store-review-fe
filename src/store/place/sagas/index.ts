import {searchPlaces} from './searchPlaces';
import * as actions from "../actions"
import { takeEvery } from 'redux-saga/effects';
import { initMainMap } from './initMainMap.ts';

export function* placeSaga() {
  yield takeEvery(actions.SEARCH_PLACES, searchPlaces);  
  yield takeEvery(actions.INIT_MAIN_MAP, initMainMap);
}