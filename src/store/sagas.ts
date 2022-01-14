import { all, fork } from 'redux-saga/effects';

import { authSaga } from './auth';
import { placeSaga } from './place';


export default function* rootSaga() {
  yield all([
    fork(authSaga),
    fork(placeSaga)
  ]);
}

// https://redux-saga.js.org/docs/advanced/RootSaga.html
