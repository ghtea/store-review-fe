import { produce } from 'immer';
import { handleActions } from 'redux-actions';
import { putValueInNestedObject } from '../../utils/others/putValueInNestedObject';
import { SagaStatus } from '../type';
import * as actions from './actions';
import { Place } from './types';

export type State = {
  mainMap: kakao.maps.Map | undefined
  searchedPlaces: {
    data: Place[] | undefined,
    keyword: string | undefined,
    status: SagaStatus
  },
  markers: kakao.maps.Marker[],
  getPageStore: {
    data: Place | undefined,
    status: SagaStatus
  },
}

const initialState = {
  mainMap: undefined,
  searchedPlaces: {
    data: undefined,
    keyword: undefined,
    status: SagaStatus.IDLE
  },
  markers: [],
  getPageStore: {
    data: undefined,
    status: SagaStatus.IDLE
  },
};

export const placeReducer = handleActions<State, any>(
  {
    [actions.REPLACE]: (previousState, action: actions.REPLACE__Instance) => {
      return produce(previousState, (newState) => {
        if (action.payload === undefined) {
          return;
        } else {
          const keyList: (string | number)[] = action.payload.keyList;

          try {
            putValueInNestedObject(newState, keyList, action.payload.replacement);
          } catch {
            return;
          }
        }
      });
    },
  },
  initialState,
);