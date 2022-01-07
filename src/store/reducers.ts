import { combineReducers } from 'redux';

import {authReducer} from './auth';
import {naverReducer} from './naver';

const rootReducer = combineReducers({
  auth: authReducer,
  naver: naverReducer,
});

export default rootReducer;

export type RootState = ReturnType<typeof rootReducer>; // https://velog.io/@velopert/use-typescript-and-redux-like-a-pro
