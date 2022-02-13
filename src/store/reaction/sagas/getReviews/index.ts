import axios, { AxiosResponse } from 'axios';
import { call, put } from 'redux-saga/effects';
import { SagaStatus } from '../../../type';

import * as actions from '../../actions';
import { GetReviewsData } from './types';

export function* getReviews(action: actions.GET_REVIEWS_Instance) {
  const payload = action.payload

  yield put(
    actions.return__REPLACE({
      keyList: ['getReviews', 'status'],
      replacement: SagaStatus.LOADING
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
        replacement: SagaStatus.SUCCESS
      }),
    );

    yield put(
      actions.return__REPLACE({
        keyList: ["getReviews", "placeId"],
        replacement: payload.placeId
      })
    )
  } catch (error) {
    console.log(error);

    yield put(
      actions.return__REPLACE({
        keyList: ['getReviews', 'status'],
        replacement: SagaStatus.ERROR
      }),
    );
    
  }
}
