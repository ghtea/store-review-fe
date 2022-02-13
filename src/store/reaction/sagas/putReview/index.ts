import axios, { AxiosResponse } from 'axios';
import { call, put, select } from 'redux-saga/effects';
import { encode } from 'js-base64';

import * as actions from '../../actions';
import { PutReviewData } from './types';
import { RootState } from '../../../reducers';
import { SagaStatus } from '../../../type';

export function* putReview(action: actions.PUT_REVIEW_Instance) {
  const payload = action.payload

  yield put(
    actions.return__REPLACE({
      keyList: ['putReview', 'status'],
      replacement: SagaStatus.LOADING
    }),
  );

  try {
    const formData = new FormData();
    const keyValue = {
      content: encode(payload.content),
      stars: payload.stars,
      imgUrl: payload.serverImgUrl.map(item => encode(item))
    }

    formData.append("key", JSON.stringify(keyValue));

    (payload.imgFileList || []).forEach(item => {
      formData.append("imgFileList", item);
    })
    
    const response: AxiosResponse<PutReviewData> = yield call(
      axios.put,
      `${process.env.REACT_APP_BACKEND_URL}/reviews/${payload.reviewId}`,
      formData,
      {
        headers: { "Content-Type": "multipart/form-data" }
      }
    );

    // const response: AxiosResponse<PutReviewData> = yield call(
    //   axios.put,
    //   `${process.env.REACT_APP_BACKEND_URL}/review`,
    //   {
    //     ...(payload.content ? { content: payload.content } : {}),
    //     ...(payload.stars ? { stars: payload.stars } : {}),
    //     ...(payload.imgFileList ? { imgFileList: payload.imgFileList } : {}),
    //   }
    // );

    yield put(
      actions.return__REPLACE({
        keyList: ['putReview', 'data'],
        replacement: response.data
      }),
    );

    yield put(
      actions.return__REPLACE({
        keyList: ['putReview', 'status'],
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
        keyList: ['putReview', 'status'],
        replacement: SagaStatus.ERROR
      }),
    );
    
  }
}
