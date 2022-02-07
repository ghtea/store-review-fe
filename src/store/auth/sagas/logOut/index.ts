import axios from 'axios';
import { put } from 'redux-saga/effects';

import * as actions from '../../actions';

export function* logOut(action: actions.LOG_OUT__Instance) {
  
  yield put(
    actions.return__REPLACE({
      keyList: ['data'],
      replacement: undefined
    }),
  );
  yield put(
    actions.return__REPLACE({
      keyList: ['status', "authenticated"],
      replacement: false
    }),
  );
  
  localStorage.removeItem("accessToken")
  axios.defaults.headers.common["Authorization"] = ""
}