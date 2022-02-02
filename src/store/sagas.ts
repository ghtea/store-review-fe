import { all, fork } from 'redux-saga/effects';

import { authSaga } from './auth';
import { placeSaga } from './place';
import { reactionSaga } from './reaction';


export default function* rootSaga() {
  yield all([
    fork(authSaga),
    fork(placeSaga),
    fork(reactionSaga)
  ]);
}

// https://redux-saga.js.org/docs/advanced/RootSaga.html
