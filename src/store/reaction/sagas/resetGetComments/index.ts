import { put } from 'redux-saga/effects';
import { SagaStatus } from '../../../type';

import * as actions from '../../actions';

export function* resetGetComments(action: actions.RESET_GET_COMMENTS_Instance) {

  yield put(
    actions.return__REPLACE({
      keyList: ['getComments'],
      replacement:{
        data: undefined,
        placeId: undefined,
        status: SagaStatus.IDLE,
      },
    }),
  );
}
