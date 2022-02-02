import axios, { AxiosResponse } from 'axios';
import { call, put } from 'redux-saga/effects';

import * as actions from '../../actions';
import { PostReviewData } from './types';

export function* postReview(action: actions.POST_REVIEW_Instance) {
  const payload = action.payload

  yield put(
    actions.return__REPLACE({
      keyList: ['postReview', 'status'],
      replacement: {
        loading: true,
        ready: false,
      },
    }),
  );

  try {
    const response: AxiosResponse<PostReviewData> = yield call(
      axios.post,
      `${process.env.REACT_APP_BACKEND_URL}/review`,
      {
        placeId: payload.placeId,
        content: payload.content,
        stars: payload.stars,
        imgUrl: payload.imgUrl,
      }
    );

    yield put(
      actions.return__REPLACE({
        keyList: ['postReview', 'data'],
        replacement: response.data
      }),
    );

    yield put(
      actions.return__REPLACE({
        keyList: ['postReview', 'status'],
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
        keyList: ['postReview', 'status'],
        replacement: {
          loading: false,
          ready: false,
        },
      }),
    );
    
  }
}
