import { produce } from 'immer';
import { handleActions } from 'redux-actions';
import { putValueInNestedObject } from '../../utils/others/putValueInNestedObject';
import * as actions from './actions';
import {SearchPlacesResponseData} from "./sagas/searchPlaces"

export type State = {
  searchedPlaces: {
    data: SearchPlacesResponseData["data"] | undefined,
    status: {
      loading: boolean,
      ready: boolean,
    }
  }
}

const initialState = {
  searchedPlaces: {
    data: undefined,
    status: {
      loading: false,
      ready: true,
    }
  }
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