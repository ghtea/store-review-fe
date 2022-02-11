import { handleActions } from "redux-actions";
import * as actions from "./actions";

export type State = {
  authorization: boolean;
  authority: string;
};

const initialState = {
  authorization: false,
  authority: "",
};

export const authReducer = handleActions<State, any>(
  {
    [actions.AUTH]: (previousState: State, action: actions.AUTH__Instance) => ({
      authorization: action.payload.authorization,
      authority: action.payload.authority,
    }),
  },
  initialState
);
