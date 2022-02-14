import { put } from 'redux-saga/effects';
import jwt_decode from "jwt-decode";
import * as actions from '../../actions';
import { decryptAes } from '../../../../utils/crypto';

export function* authenticate(action: actions.AUTHENTICATE__Instance) {
  const payload = action.payload

  if (payload.token){
    const data = jwt_decode<{
      auth: string
      exp: number
      said: string
      sub: string
      suid: string
    }>(payload.token)
    
    if (new Date() < new Date(data.exp * 1000)){
      yield put(
        actions.return__REPLACE({
          keyList: ['data'],
          replacement: {
            ...data,
            said: decryptAes(data.said),
            suid: decryptAes(data.suid),
          }
        }),
      );
      yield put(
        actions.return__REPLACE({
          keyList: ["authenticated"],
          replacement: true
        }),
      );
    }
    else {
      yield put(
        actions.return__LOG_OUT(),
      );
    }
    
  }
  else {

  }
}