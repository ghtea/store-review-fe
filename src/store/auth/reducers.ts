<<<<<<< HEAD
import { handleActions } from "redux-actions";
import * as actions from "./actions";

export type State = {
  authorization: boolean;
  authority: string;
};

const initialState = {
  authorization: false,
  authority: "",
=======
import { produce } from 'immer';
import { handleActions } from 'redux-actions';
import { putValueInNestedObject } from '../../utils/others/putValueInNestedObject';
import * as actions from './actions';

export type State = {
  data: {
    auth: string
    exp: number
    said: string
    sub: string // email
    suid: string
  } | undefined
  status: {
    authenticated: boolean
  }
};

const initialState: State = {
  data: undefined,
  status: {
    authenticated: false
  }
>>>>>>> b73b4b939fc433f12fec1377e8ff6d1a1cd61fc1
};

export const authReducer = handleActions<State, any>(
  {
<<<<<<< HEAD
    [actions.AUTH]: (previousState: State, action: actions.AUTH__Instance) => ({
      authorization: action.payload.authorization,
      authority: action.payload.authority,
    }),
  },
  initialState
);
=======
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
  }, initialState);
>>>>>>> b73b4b939fc433f12fec1377e8ff6d1a1cd61fc1
