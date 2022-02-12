import { put } from 'redux-saga/effects';

import * as actions from '../../actions';

export function* resetSearchPlaces(action: actions.RESET_SEARCH_PLACES_Instance) {

  yield put(
    actions.return__REPLACE({
      keyList: ['searchedPlaces'],
      replacement:{
        data: undefined,
        keyword: undefined,
        status: {
          loading: false,
          ready: false,
        }
      },
    }),
  );
}
