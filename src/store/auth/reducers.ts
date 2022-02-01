import { produce } from 'immer';
import { handleActions } from 'redux-actions';
import * as actions from './actions';

export type State = {
  authority: string,
  nickname: string
};

const initialState = {
  authority: "",
  nickname: ""
};

export const authReducer = handleActions<State, any>({
  [actions.AUTH]: (previousState: State, action: actions.AUTH__Instance) => ({
    authority: action.payload.authority,
    nickname: action.payload.nickname
  }),
}, initialState);
