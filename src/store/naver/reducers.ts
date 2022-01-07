import { produce } from 'immer';
import { handleActions } from 'redux-actions';
import { putValueInNestedObject } from '../../utils/others/putValueInNestedObject';
import * as actions from './actions';
import {SearchPlacesData} from "./sagas/searchPlaces"

export type State = {
  searchedPlaces: {
    data: SearchPlacesData | undefined,
    status: {
      loading: boolean,
      ready: boolean,
    }
  }
} // 아직 불확실

const initialState = {
  // user: null as types.auth.User | null,
  // member: null as types.auth.Member | null,
  searchedPlaces: {
    data: undefined,
    status: {
      loading: false,
      ready: true,
    }
  }
};

export const naverReducer = handleActions<State, any>(
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