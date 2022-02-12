import { put } from 'redux-saga/effects';
import jwt_decode from "jwt-decode";
import * as actions from '../../actions';
import aes from  "crypto-js/aes";

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

    // console.log("data: ", data); // TODO: remove
    // console.log("process.env.REACT_APP_AES_KEY: ", process.env.REACT_APP_AES_KEY); // TODO: remove
    // console.log(new Date(data.exp))
    yield put(
      actions.return__REPLACE({
        keyList: ['data'],
        replacement: {
          ...data,
          said: aes.decrypt(data.said, process.env.REACT_APP_AES_KEY || "").toString(),
          suid: aes.decrypt(data.suid, process.env.REACT_APP_AES_KEY || "").toString(),
        }
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