import axios, { AxiosResponse } from 'axios';
import { call, put, select } from 'redux-saga/effects';
import { RootState } from '../../../reducers';

import * as actions from '../../actions';
import { DeleteCommentData } from './types';

export function* deleteComment(action: actions.DELETE_COMMENT_Instance) {
  const payload = action.payload

  yield put(
    actions.return__REPLACE({
      keyList: ['deleteComment', 'status'],
      replacement: {
        loading: true,
        ready: false,
      },
    }),
  );

  try {
    const response: AxiosResponse<DeleteCommentData> = yield call(
      axios.delete,
      `${process.env.REACT_APP_BACKEND_URL}/comment/${payload.commentId}`,
    );

    yield put(
      actions.return__REPLACE({
        keyList: ['deleteComment', 'data'],
        replacement: response.data
      }),
    );

    yield put(
      actions.return__REPLACE({
        keyList: ['deleteComment', 'status'],
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
        keyList: ['deleteComment', 'status'],
        replacement: {
          loading: false,
          ready: false,
        },
      }),
    );
    
  }
}
