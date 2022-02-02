import axios, { AxiosResponse } from 'axios';
import { call, put } from 'redux-saga/effects';

import * as actions from '../../actions';
import { GetReviewsData } from './types';

export function* getReviews(action: actions.GET_REVIEWS_Instance) {
  const payload = action.payload
  console.log("yo"); // TODO: remove

  yield put(
    actions.return__REPLACE({
      keyList: ['getReviews', 'status'],
      replacement: {
        loading: true,
        ready: false,
      },
    }),
  );

  try {
    const response: AxiosResponse<GetReviewsData> = yield call(
      axios.get,
      `${process.env.REACT_APP_BACKEND_URL}/places/${payload.placeId}`
    );

    yield put(
      actions.return__REPLACE({
        keyList: ['getReviews', 'data'],
        replacement: response.data
      }),
    );

    yield put(
      actions.return__REPLACE({
        keyList: ['getReviews', 'status'],
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
        keyList: ['getReviews', 'status'],
        replacement: {
          loading: false,
          ready: false,
        },
      }),
    );
    
  }
}