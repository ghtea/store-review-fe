import { all, fork } from 'redux-saga/effects';

import {authSaga} from './auth';


export default function* rootSaga() {
  yield all([
    fork(authSaga),
  ]);
}

// https://redux-saga.js.org/docs/advanced/RootSaga.html
