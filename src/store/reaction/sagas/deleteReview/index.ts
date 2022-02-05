import axios, { AxiosResponse } from 'axios';
import { call, put } from 'redux-saga/effects';

import * as actions from '../../actions';
import { DeleteReviewData } from './types';

export function* deleteReview(action: actions.DELETE_REVIEW_Instance) {
  const payload = action.payload

  yield put(
    actions.return__REPLACE({
      keyList: ['deleteReview', 'status'],
      replacement: {
        loading: true,
        ready: false,
      },
    }),
  );

  try {
    const response: AxiosResponse<DeleteReviewData> = yield call(
      axios.delete,
      `${process.env.REACT_APP_BACKEND_URL}/reviews/${payload.reviewId}`
    );

    yield put(
      actions.return__REPLACE({
        keyList: ['deleteReview', 'data'],
        replacement: response.data
      }),
    );

    yield put(
      actions.return__REPLACE({
        keyList: ['deleteReview', 'status'],
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
        keyList: ['deleteReview', 'status'],
        replacement: {
          loading: false,
          ready: false,
        },
      }),
    );
    
  }
}
