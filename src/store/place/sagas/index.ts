import {searchPlaces} from './searchPlaces';
import * as actions from "../actions"
import { takeEvery } from 'redux-saga/effects';

export function* placeSaga() {
  yield takeEvery(actions.SEARCH_PLACES, searchPlaces);
}