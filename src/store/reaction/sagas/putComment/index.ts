import axios, { AxiosResponse } from 'axios';
import { call, put } from 'redux-saga/effects';
import { encode } from 'js-base64';

import * as actions from '../../actions';
import { PutCommentData } from './types';

export function* putComment(action: actions.PUT_COMMENT_Instance) {
  const payload = action.payload

  yield put(
    actions.return__REPLACE({
      keyList: ['putComment', 'status'],
      replacement: {
        loading: true,
        ready: false,
      },
    }),
  );

  try {
    const response: AxiosResponse<PutCommentData> = yield call(
      axios.put,
      `${process.env.REACT_APP_BACKEND_URL}/comment`,
      {
        ...(payload.content ? { content: encode(payload.content) } : {}),
      }
    );

    yield put(
      actions.return__REPLACE({
        keyList: ['putComment', 'data'],
        replacement: response.data
      }),
    );

    yield put(
      actions.return__REPLACE({
        keyList: ['putComment', 'status'],
        replacement: {
          loading: false,
          ready: true,
        },
      }),
    );
  } catch (error) {
    console.log(error);

    yield put(
      actions.return__REPLACE({
        keyList: ['putComment', 'status'],
        replacement: {
          loading: false,
          ready: false,
        },
      }),
    );
    
  }
}
