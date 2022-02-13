import { put } from 'redux-saga/effects';
import { SagaStatus } from '../../../type';

import * as actions from '../../actions';

export function* resetGetReviews(action: actions.RESET_GET_REVIEWS_Instance) {

  yield put(
    actions.return__REPLACE({
      keyList: ['getReviews'],
      replacement:{
        data: undefined,
        reviewId: undefined,
        allComments: undefined,
        pageNo: undefined,
        hasMore: undefined,
        status: SagaStatus.IDLE,
      },
    }),
  );
}