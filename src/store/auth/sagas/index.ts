import * as actions from "../actions"
import { takeEvery } from 'redux-saga/effects';
import { authenticate } from './authenticate';
import { logOut } from "./logOut";

export function* authSaga() {
  yield takeEvery(actions.AUTHENTICATE, authenticate);  
  yield takeEvery(actions.LOG_OUT, logOut); 
}