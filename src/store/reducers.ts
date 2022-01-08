import { combineReducers } from 'redux';

import {authReducer} from './auth';
import {placeReducer} from './place';

const rootReducer = combineReducers({
  auth: authReducer,
  place: placeReducer,
});

export default rootReducer;

export type RootState = ReturnType<typeof rootReducer>; // https://velog.io/@velopert/use-typescript-and-redux-like-a-pro
