import axios, { AxiosResponse } from 'axios';
import { call, put } from 'redux-saga/effects';
import { encode } from 'js-base64';

import * as actions from '../../actions';
import { PutReviewData } from './types';

export function* putReview(action: actions.PUT_REVIEW_Instance) {
  const payload = action.payload

  yield put(
    actions.return__REPLACE({
      keyList: ['putReview', 'status'],
      replacement: {
        loading: true,
        ready: false,
      },
    }),
  );

  try {
    const formData = new FormData();
    const keyValue = {
      ...(payload.content ? { content: encode(payload.content) } : {}),
      ...(payload.stars ? { stars: payload.stars } : {}),
      ...(payload.imgUrl ? { imgUrl: payload.imgUrl } : {}),
    }
    formData.append("key", JSON.stringify(keyValue));

    (payload.imgFileList || []).forEach(item => {
      formData.append("imgFileList", item);
    })
    // (payload.imgFileList || []).forEach((item, index) => {
    //   formData.append(`imgFileList[${index}]`, item);
    // })
    const response: AxiosResponse<PutReviewData> = yield call(
      axios.put,
      `${process.env.REACT_APP_BACKEND_URL}/review`,
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
        keyList: ['putReview', 'status'],
        replacement: {
          loading: false,
          ready: false,
        },
      }),
    );
    
  }
}
