import axios, { AxiosResponse } from 'axios';
import { call, put, select } from 'redux-saga/effects';
import { encode } from 'js-base64';

import * as actions from '../../actions';
import { PutCommentData } from './types';
import { RootState } from '../../../reducers';

export function* putComment(action: actions.PUT_COMMENT_Instance) {
  const payload = action.payload

  yield put(
    actions.return__REPLACE({
      keyList: ['putComment', 'status'],
      replacement: {
        loading: true,
        ready: false,
      },
    }),
  );

  try {
    const response: AxiosResponse<PutCommentData> = yield call(
      axios.put,
      `${process.env.REACT_APP_BACKEND_URL}/comment`,
      {
        commentId: payload.commentId,
        ...(payload.content ? { content: encode(payload.content) } : {}),
      }
    );

    yield put(
      actions.return__REPLACE({
        keyList: ['putComment', 'data'],
        replacement: response.data
      }),
    );

    yield put(
      actions.return__REPLACE({
        keyList: ['putComment', 'status'],
        replacement: {
          loading: false,
          ready: true,
        },
      }),
    );

    // refetch comments
    const getCommentsReviewId: number | undefined = yield select(
      (state: RootState) => state.reaction.getComments.reviewId
    );

    if (getCommentsReviewId){
      yield put(
        actions.return__GET_COMMENTS({
          reviewId: getCommentsReviewId,
          pageNo: 0,
        }),
      )
    }
  } catch (error) {
    console.log(error);

    yield put(
      actions.return__REPLACE({
        keyList: ['putComment', 'status'],
        replacement: {
          loading: false,
          ready: false,
        },
      }),
    );
    
  }
}
