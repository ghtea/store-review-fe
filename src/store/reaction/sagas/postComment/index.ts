import axios, { AxiosResponse } from 'axios';
import { call, put } from 'redux-saga/effects';

import * as actions from '../../actions';
import { PostCommentData } from './types';

export function* postComment(action: actions.POST_COMMENT_Instance) {
  const payload = action.payload

  yield put(
    actions.return__REPLACE({
      keyList: ['postComment', 'status'],
      replacement: {
        loading: true,
        ready: false,
      },
    }),
  );

  try {
    const response: AxiosResponse<PostCommentData> = yield call(
      axios.post,
      `${process.env.REACT_APP_BACKEND_URL}/comment`,
      {
        reviewId: payload.reviewId,
        content: payload.content
      }
    );

    yield put(
      actions.return__REPLACE({
        keyList: ['postComment', 'data'],
        replacement: response.data
      }),
    );

    yield put(
      actions.return__REPLACE({
        keyList: ['postComment', 'status'],
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
        keyList: ['postComment', 'status'],
        replacement: {
          loading: false,
          ready: false,
        },
      }),
    );
    
  }
}
