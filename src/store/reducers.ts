import { combineReducers } from 'redux';

import { authReducer } from './auth';
import { placeReducer } from './place';
import { reactionReducer } from './reaction';

const rootReducer = combineReducers({
  auth: authReducer,
  place: placeReducer,
  reaction: reactionReducer,
});

export default rootReducer;

export type RootState = ReturnType<typeof rootReducer>; // https://velog.io/@velopert/use-typescript-and-redux-like-a-pro
