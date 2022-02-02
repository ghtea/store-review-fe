import axios, { AxiosResponse } from 'axios';
import { call, put } from 'redux-saga/effects';

import * as actions from '../../actions';
import { DeleteCommentData } from './types';

export function* deleteComment(action: actions.DELETE_COMMENT_Instance) {
  const payload = action.payload

  yield put(
    actions.return__REPLACE({
      keyList: ['deleteComment', 'status'],
      replacement: {
        loading: true,
        ready: false,
      },
    }),
  );

  try {
    const response: AxiosResponse<DeleteCommentData> = yield call(
      axios.put,
      `${process.env.REACT_APP_BACKEND_URL}/comment`,
      {
        commentId: payload.commentId,
      }
    );

    yield put(
      actions.return__REPLACE({
        keyList: ['deleteComment', 'data'],
        replacement: response.data
      }),
    );

    yield put(
      actions.return__REPLACE({
        keyList: ['deleteComment', 'status'],
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
        keyList: ['deleteComment', 'status'],
        replacement: {
          loading: false,
          ready: false,
        },
      }),
    );
    
  }
}
