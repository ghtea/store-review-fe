import axios, { AxiosResponse } from 'axios';
import { call, put, select } from 'redux-saga/effects';
import { RootState } from '../../../reducers';
import { SagaStatus } from '../../../type';

import * as actions from '../../actions';
import { DeleteReviewData } from './types';

export function* deleteReview(action: actions.DELETE_REVIEW_Instance) {
  const payload = action.payload

  yield put(
    actions.return__REPLACE({
      keyList: ['deleteReview', 'status'],
      replacement: SagaStatus.LOADING
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
        replacement: SagaStatus.SUCCESS
      }),
    );

    // refetch reviews
    const getReviewsPlaceId: string | undefined = yield select(
      (state: RootState) => state.reaction.getReviews.placeId
    );

    if (getReviewsPlaceId){
      yield put(
        actions.return__GET_REVIEWS({
          placeId: getReviewsPlaceId
        }),
      )
    }
  } catch (error) {
    console.log(error);

    yield put(
      actions.return__REPLACE({
        keyList: ['deleteReview', 'status'],
        replacement: SagaStatus.ERROR
      }),
    );
    
  }
}
