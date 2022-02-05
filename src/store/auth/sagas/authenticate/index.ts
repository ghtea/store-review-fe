import { put, select } from 'redux-saga/effects';
import { RootState } from '../../../reducers';
import jwt_decode from "jwt-decode";

import * as actions from '../../actions';

export function* authenticate(action: actions.AUTHENTICATE__Instance) {
  const payload = action.payload

  if (payload.token){
    const data = jwt_decode(payload.token)

    console.log("data: ", data); // TODO: remove
    yield put(
      actions.return__REPLACE({
        keyList: ['data'],
        replacement: data
      }),
    );
    yield put(
      actions.return__REPLACE({
        keyList: ['status', "authenticated"],
        replacement: true
      }),
    );
  }
  else {

  }
}