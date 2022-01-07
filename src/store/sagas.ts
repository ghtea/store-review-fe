import { all, fork } from 'redux-saga/effects';

import {authSaga} from './auth';
import {naverSaga} from './naver';


export default function* rootSaga() {
  yield all([
    fork(authSaga),
    fork(naverSaga)
  ]);
}

// https://redux-saga.js.org/docs/advanced/RootSaga.html
