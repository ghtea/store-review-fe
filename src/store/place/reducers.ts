import { produce } from 'immer';
import { handleActions } from 'redux-actions';
import { putValueInNestedObject } from '../../utils/others/putValueInNestedObject';
import * as actions from './actions';
import { Place } from './types';

export type State = {
  mainMap: kakao.maps.Map | undefined
  searchedPlaces: {
    data: Place[] | undefined,
    keyword: string | undefined,
    status: {
      loading: boolean,
      ready: boolean,
    }
  },
  markers: kakao.maps.Marker[]
}

const initialState = {
  mainMap: undefined,
  searchedPlaces: {
    data: undefined,
    keyword: undefined,
    status: {
      loading: false,
      ready: true,
    }
  },
  markers: []
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