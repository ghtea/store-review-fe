import { produce } from 'immer';
import { handleActions } from 'redux-actions';

// import * as actions from './actions';
// import * as types from './types';

export type State = typeof stateInitial; // 아직 불확실

const stateInitial = {
  // user: null as types.auth.User | null,
  // member: null as types.auth.Member | null,
};

const authReducer = handleActions<State, any>(
  {
    // [actions.auth.name__REPLACE]: (previousState, action: actions.auth.type__REPLACE) => {
    //   return produce(previousState, (newState) => {
    //     if (action.payload === undefined) {
    //       return;
    //     } else {
    //       const keyList: (string | number)[] = action.payload.keyList;

    //       try {
    //         putValueToNestedObject(newState, keyList, action.payload.replacement);
    //       } catch {
    //         return;
    //       }
    //     }
    //   });
    // },
  },
  stateInitial,
);


export default authReducer;