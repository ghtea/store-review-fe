import axios, { AxiosResponse } from 'axios';
import { call, put, select } from 'redux-saga/effects';
import { encode } from 'js-base64';

import * as actions from '../../actions';
import { PostReviewData } from './types';
import { RootState } from '../../../reducers';

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
    const formData = new FormData();
    const keyValue = {
      placeId: payload.placeId,
      content: encode(payload.content),
      stars: payload.stars
    }
    formData.append("key", JSON.stringify(keyValue));

    payload.imgFileList.forEach(item => {
      formData.append("imgFileList", item);
    })

    const response: AxiosResponse<PostReviewData> = yield call(
      axios.post,
      `${process.env.REACT_APP_BACKEND_URL}/review`,
      formData,
      {
        headers: { "Content-Type": "multipart/form-data" }
      }
    );
    // const response: AxiosResponse<PostReviewData> = yield call(
    //   axios.post,
    //   `${process.env.REACT_APP_BACKEND_URL}/review`,
    //   {
    //     placeId: payload.placeId,
    //     content: payload.content,
    //     stars: payload.stars,
    //     iimgFileList: payload.imgFileList,
    //   }
    // );
    console.log("response: ", response); // TODO: remove

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
        keyList: ['postReview', 'status'],
        replacement: {
          loading: false,
          ready: false,
        },
      }),
    );
    
  }
}
