import axios, { AxiosResponse } from 'axios';
import { call, put } from 'redux-saga/effects';

import * as actions from '../../actions';
import { GetCommentsData } from './types';

export function* getComments(action: actions.GET_COMMENTS_Instance) {
  const payload = action.payload

  yield put(
    actions.return__REPLACE({
      keyList: ['getComments', 'status'],
      replacement: {
        loading: true,
        ready: false,
      },
    }),
  );

  try {
    const response: AxiosResponse<GetCommentsData> = yield call(
      axios.get,
      `${process.env.REACT_APP_BACKEND_URL}/comment/${payload.reviewId}/${payload.pageNo}`
    );

    yield put(
      actions.return__REPLACE({
        keyList: ['getComments', 'data'],
        replacement: response.data
      }),
    );

    yield put(
      actions.return__REPLACE({
        keyList: ['getComments', 'status'],
        replacement: {
          loading: false,
          ready: true,
        },
      }),
    );

    yield put(
      actions.return__REPLACE({
        keyList: ["getComments", "reviewId"],
        replacement: payload.reviewId
      })
    )
  } catch (error) {
    console.log(error);

    yield put(
      actions.return__REPLACE({
        keyList: ['getComments', 'status'],
        replacement: {
          loading: false,
          ready: false,
        },
      }),
    );
    
  }
}
